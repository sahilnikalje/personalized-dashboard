import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FeedItem } from '@/types';
import { transformNewsArticle } from './newsTransformer';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<FeedItem[], string>({
      query: (category) => `/news?category=${category}&pageSize=10`,
      transformResponse: (res: any) =>
        res.articles?.map(transformNewsArticle) ?? [],
    }),
    searchNews: builder.query<FeedItem[], string>({
      query: (q) => `/news?q=${encodeURIComponent(q)}&pageSize=8`,
      transformResponse: (res: any) =>
        res.articles?.map(transformNewsArticle) ?? [],
    }),
  }),
});

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi;