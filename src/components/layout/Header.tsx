'use client';

import { useState } from 'react';
import { Search, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { setQuery, clearSearch } from '@/features/search/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchNewsQuery } from '@/services/news/newsApi';
import { useSearchMoviesQuery } from '@/services/tmdb/tmdbApi';
import { FeedItem } from '@/types';

export default function Header() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);
  const [focused, setFocused] = useState(false);

  const debouncedQuery = useDebounce(query, 400);
  const shouldSearch = debouncedQuery.length > 2;

  const { data: newsResults, isFetching: newsFetching } = useSearchNewsQuery(debouncedQuery, {
    skip: !shouldSearch,
  });
  const { data: movieResults, isFetching: movieFetching } = useSearchMoviesQuery(debouncedQuery, {
    skip: !shouldSearch,
  });

  const isLoading = newsFetching || movieFetching;
  const results: FeedItem[] = [
    ...(newsResults ?? []).slice(0, 3),
    ...(movieResults ?? []).slice(0, 3),
  ];

  const typeColors: Record<string, string> = {
    news:   'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    movie:  'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    social: 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400',
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3">
      <div className="flex items-center gap-4 max-w-screen-xl mx-auto">
        <div className="w-10 shrink-0 lg:hidden" />

        <div className="flex-1 max-w-xl relative">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
              focused
                ? 'border-blue-500 bg-white dark:bg-gray-800 shadow-md shadow-blue-500/10'
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
            }`}
          >
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search news, movies, posts..."
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
            {isLoading && (
              <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
            )}
            {query && !isLoading && (
              <button onClick={() => dispatch(clearSearch())}>
                <X size={14} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {focused && shouldSearch && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50"
              >
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Results
                </p>
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    {item.image && (
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">{item.source}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell size={18} className="text-gray-500 dark:text-gray-400" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            S
          </div>
        </div>
      </div>
    </header>
  );
}