import { GET_METHOD } from '@/rtk-query/api.constants';
import { GET_BLOG_POSTS_PATH } from '@/rtk-query/blog/api.constants';
import { BlogPostResponse } from '@/rtk-query/blog/types';
import { unauthenticatedGlobalApi } from '@/rtk-query/unauthenticatedGlobalApi';

interface BlogPostParams {
  page?: number;
  limit?: number;
}

const AuthApi = unauthenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getBlogPosts: build.query<BlogPostResponse, BlogPostParams>({
      query: ({ page = 1, limit = 15 } = {}) => ({
        url: GET_BLOG_POSTS_PATH,
        method: GET_METHOD,
        params: {
          page,
          limit,
        },
      }),
    }),
  }),
});

export const { useGetBlogPostsQuery } = AuthApi;
