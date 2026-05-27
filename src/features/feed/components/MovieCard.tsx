'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Play } from 'lucide-react';
import { FeedItem } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { addFavorite, removeFavorite } from '@/features/favorites/favoritesSlice';
import { toast } from 'sonner';
import { FALLBACK_MOVIE_IMAGE } from '@/constants';

export default function MovieCard({ item }: { item: FeedItem }) {
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
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20 transition-shadow group"
    >
      <div className="relative h-52 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_MOVIE_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={18} className="text-white ml-0.5" />
          </div>
        </div>

        <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          Movie
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

        {item.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            {item.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">
          {item.publishedAt?.slice(0, 4)} · {item.source}
        </p>
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
          <Play size={11} /> Watch Now
        </button>
      </div>
    </motion.article>
  );
}