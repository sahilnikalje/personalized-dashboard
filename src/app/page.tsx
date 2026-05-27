import DashboardLayout from '@/components/layout/DashboardLayout';
import NewsCard from '@/features/feed/components/NewsCard';
import MovieCard from '@/features/feed/components/MovieCard';
import SocialCard from '@/features/feed/components/SocialCard';
import { mockSocialPosts } from '@/services/social/mockData';
import { FALLBACK_NEWS_IMAGE, FALLBACK_MOVIE_IMAGE } from '@/constants';

const previewNews = {
  id: 'preview-news',
  type: 'news' as const,
  title: 'Breaking: Major Tech Breakthrough Announced',
  description: 'Scientists have announced a revolutionary advancement that could change the tech landscape forever.',
  image: FALLBACK_NEWS_IMAGE,
  source: 'TechCrunch',
  publishedAt: new Date().toISOString(),
  url: '#',
};

const previewMovie = {
  id: 'preview-movie',
  type: 'movie' as const,
  title: 'Oppenheimer',
  description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  image: FALLBACK_MOVIE_IMAGE,
  source: 'TMDB',
  rating: 8.9,
  publishedAt: '2023-07-21',
};

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NewsCard item={previewNews} />
        <MovieCard item={previewMovie} />
        <SocialCard item={mockSocialPosts[0]} />
      </div>
    </DashboardLayout>
  );
}