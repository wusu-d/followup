import axios, { AxiosError } from 'axios';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import logger from '@/lib/logger';

import { LoginFormFieldIds } from '@/app/(authentication)/login/_utlils/login.constants';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import { BASE_URL } from '@/rtk-query/api.constants';
import { LOGIN_USER_PATH } from '@/rtk-query/auth/auth.api.constants';
import { GET_USER_PROFILE_PATH } from '@/rtk-query/profile/api.constants';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login Form',
      id: 'login',
      credentials: {
        [LoginFormFieldIds.EMAIL]: {
          label: 'email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        [LoginFormFieldIds.PASSWORD]: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const formData = new FormData();

          formData.append(
            LoginFormFieldIds.EMAIL,
            credentials ? credentials[LoginFormFieldIds.EMAIL] : ''
          );
          formData.append(
            LoginFormFieldIds.PASSWORD,
            credentials ? credentials[LoginFormFieldIds.PASSWORD] : ''
          );

          const user = await axios.post<{
            access_token: string;
            user_groups: RolesEnum[];
          }>(`${BASE_URL}${LOGIN_USER_PATH}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (user.data) {
            const userProfile = await axios.get(
              `${BASE_URL}${GET_USER_PROFILE_PATH}`,
              {
                headers: {
                  Authorization: `Bearer ${user.data.access_token}`,
                  'Content-Type': 'applcation/json',
                },
              }
            );

            // const onboarding_stage = {
            //   personal_profile:
            //     userProfile.data.onboarding_stage.personal_profile_completed,
            //   subscription:
            //     userProfile.data.onboarding_stage.subscription_completed,
            // };

            return {
              access_token: user.data.access_token,
              user_groups: user.data.user_groups,
              profile_status: userProfile.data.status,
              profile_data: userProfile?.data?.data,
              // onboarding_stage: onboarding_stage,
            } as User;
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (
              error.response?.data &&
              typeof error.response.data === 'object'
            ) {
              if (
                error.response.data.messages &&
                typeof error.response.data.messages === 'object' &&
                error.response.data.messages.error
              ) {
                logger(error.response.data.messages);
                throw new Error(error.response.data.messages.error);
              }
              throw new Error(error.response.data.messages);
            }

            logger(error);

            throw new Error(error.message);
          }

          logger({ error }, 'error here');
        }
        return null;
      },
    }),
  ],

  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },

  secret: `${process.env.NEXTAUTH_SECRET}`,

  callbacks: {
    jwt: async ({ token, user, trigger, session, account }) => {
      // initial signin
      if (user) {
        token.data = user;
        console.log('token', token);
        return token;
      }

      if (trigger === 'update') {
        const updatedToken = token;
        updatedToken.data = session;
        return updatedToken;
      }
      // user && (token.data = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.access_token = token.data.access_token;
      session.user_groups = token.data.user_groups;
      session.profile_status = token.data.profile_status as string;
      session.profile_data = token.data.profile_data;
      session.onboarding_stage = token.data.onboarding_stage;
      console.log('session', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
