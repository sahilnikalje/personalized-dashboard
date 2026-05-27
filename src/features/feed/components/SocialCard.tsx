'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { FeedItem } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { addFavorite, removeFavorite } from '@/features/favorites/favoritesSlice';
import { toast } from 'sonner';
import { formatDate } from '@/utils';

export default function SocialCard({ item }: { item: FeedItem }) {
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
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <img
            src={item.avatar}
            alt={item.username}
            className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.username}</p>
            <p className="text-xs text-gray-400">
              {item.publishedAt ? formatDate(item.publishedAt) : 'Recently'} · {item.source}
            </p>
          </div>
        </div>
        <span className="bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full">
          Social
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
        {item.description}
      </p>

      {item.image && (
        <div className="rounded-xl overflow-hidden h-40 bg-gray-100 dark:bg-gray-800 mb-3">
          <img
            src={item.image}
            alt="post media"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}

      {item.hashtags && item.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.hashtags.map((tag) => (
            <span key={tag} className="text-xs text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleFavorite}
          className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
        >
          <Heart size={14} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
          {item.likes?.toLocaleString()}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
          <MessageCircle size={14} />
          {item.comments?.toLocaleString()}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
          <Share2 size={14} />
          Share
        </button>
      </div>
    </motion.article>
  );
}