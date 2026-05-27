'use client';

import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NewsCard from '@/features/feed/components/NewsCard';
import MovieCard from '@/features/feed/components/MovieCard';
import SocialCard from '@/features/feed/components/SocialCard';
import EmptyState from '@/components/ui/EmptyState';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { items } = useAppSelector((state) => state.favorites);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950 flex items-center justify-center">
              <Heart size={16} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favorites</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {items.length} saved {items.length === 1 ? 'item' : 'items'}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            description="Hit the heart icon on any card to save it here. Favorites survive a page refresh."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {item.type === 'news'   && <NewsCard   item={item} />}
                  {item.type === 'movie'  && <MovieCard  item={item} />}
                  {item.type === 'social' && <SocialCard item={item} />}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}