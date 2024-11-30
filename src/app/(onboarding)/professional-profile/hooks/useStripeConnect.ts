import {
  loadConnectAndInitialize,
  StripeConnectInstance,
} from '@stripe/connect-js';
import { useEffect, useState } from 'react';

import { useCreateAccountSessionMutation } from '@/rtk-query/stripe-onboarding';

export const useStripeConnect = (
  connectedAccountId: string | undefined,
  publishableKey: string | undefined
) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<
    StripeConnectInstance | undefined
  >();
  const [createAccountSession] = useCreateAccountSessionMutation();

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        try {
          const response = await createAccountSession({
            account: connectedAccountId,
          }).unwrap();
          return response.client_secret;
        } catch (error) {
          throw new Error('Failed to fetch client secret');
        }
      };

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: publishableKey || '',
          fetchClientSecret,
          fonts: [
            {
              cssSrc:
                'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap',
            },
          ],
          appearance: {
            overlays: 'dialog',
            variables: {
              colorPrimary: '#16C098',
              fontFamily: '"Manrope", sans-serif',
            },
          },
        })
      );
    }
  }, [connectedAccountId, publishableKey, createAccountSession]);

  return stripeConnectInstance;
};

export default useStripeConnect;
