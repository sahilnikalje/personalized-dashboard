'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MovieCard from '@/features/feed/components/MovieCard';
import NewsCard from '@/features/feed/components/NewsCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { useGetTrendingMoviesQuery } from '@/services/tmdb/tmdbApi';
import { useGetTopHeadlinesQuery } from '@/services/news/newsApi';
import { Flame, TrendingUp } from 'lucide-react';

export default function TrendingPage() {
  const { data: trendingMovies, isLoading: moviesLoading } = useGetTrendingMoviesQuery();
  const { data: trendingNews,   isLoading: newsLoading   } = useGetTopHeadlinesQuery('general');

  return (
    <DashboardLayout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
              <Flame size={16} className="text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trending</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            What everybody is watching and reading right now
          </p>
        </motion.div>

        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-4">
            <TrendingUp size={16} className="text-purple-500" /> Trending Movies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {moviesLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : trendingMovies?.slice(0, 6).map((movie, i) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <MovieCard item={movie} />
                  </motion.div>
                ))
            }
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-4">
            <TrendingUp size={16} className="text-blue-500" /> Trending News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {newsLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : trendingNews?.slice(0, 6).map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NewsCard item={article} />
                  </motion.div>
                ))
            }
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}