import { FeedItem } from '@/types';
import { TMDB_IMAGE_BASE, FALLBACK_MOVIE_IMAGE } from '@/constants';

export function transformMovie(movie: any): FeedItem {
  return {
    id: `movie-${movie.id}`,
    type: 'movie',
    title: movie.title ?? 'Unknown',
    description: movie.overview ?? 'No overview available.',
    image: movie.poster_path
      ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
      : FALLBACK_MOVIE_IMAGE,
    source: 'TMDB',
    rating: movie.vote_average,
    publishedAt: movie.release_date,
  };
}