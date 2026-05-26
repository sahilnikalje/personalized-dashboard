import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FeedItem } from '@/types';
import { transformMovie } from './tmdbTransformer';
import { TMDB_BASE_URL } from '@/constants';

const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_BASE_URL }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<FeedItem[], void>({
      query: () => `/trending/movie/day?api_key=${KEY}&language=en-US`,
      transformResponse: (res: any) =>
        res.results?.slice(0, 12).map(transformMovie) ?? [],
    }),
    getPopularMovies: builder.query<FeedItem[], void>({
      query: () => `/movie/popular?api_key=${KEY}&language=en-US&page=1`,
      transformResponse: (res: any) =>
        res.results?.slice(0, 12).map(transformMovie) ?? [],
    }),
    searchMovies: builder.query<FeedItem[], string>({
      query: (q) =>
        `/search/movie?api_key=${KEY}&query=${encodeURIComponent(q)}&language=en-US`,
      transformResponse: (res: any) =>
        res.results?.slice(0, 6).map(transformMovie) ?? [],
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} = tmdbApi;