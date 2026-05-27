'use client';

import { motion } from 'framer-motion';
import { Heart, ExternalLink, Clock } from 'lucide-react';
import { FeedItem } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { addFavorite, removeFavorite } from '@/features/favorites/favoritesSlice';
import { toast } from 'sonner';
import { formatDate } from '@/utils';
import { FALLBACK_NEWS_IMAGE } from '@/constants';

export default function NewsCard({ item }: { item: FeedItem }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((f) => f.id === item.id)
  );

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
      toast.success('Removed from favorites');
    } else {
      dispatch(addFavorite(item));
      toast.success('Saved to favorites');
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-black/40 transition-shadow group"
    >
      <div className="relative h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_NEWS_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          News
        </span>
        <button
          onClick={handleFavorite}
          aria-label="Toggle favorite"
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}
          />
        </button>
      </div>

      <div className="p-4">
        <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <Clock size={11} />
          {item.publishedAt ? formatDate(item.publishedAt) : 'Recently'} · {item.source}
        </p>
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read More <ExternalLink size={11} />
        </a>
      </div>
    </motion.article>
  );
}