'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { setFeedItems, reorderCards } from '@/features/feed/feedSlice';
import { useGetTopHeadlinesQuery } from '@/services/news/newsApi';
import { useGetPopularMoviesQuery } from '@/services/tmdb/tmdbApi';
import { mockSocialPosts } from '@/services/social/mockData';
import { FeedItem } from '@/types';
import NewsCard from './NewsCard';
import MovieCard from './MovieCard';
import SocialCard from './SocialCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import EmptyState from '@/components/ui/EmptyState';

function SortableCard({ item }: { item: FeedItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.type === 'news'   && <NewsCard   item={item} />}
      {item.type === 'movie'  && <MovieCard  item={item} />}
      {item.type === 'social' && <SocialCard item={item} />}
    </div>
  );
}

const FILTER_TABS = [
  { id: 'all',    label: 'All' },
  { id: 'news',   label: 'News' },
  { id: 'movie',  label: 'Movies' },
  { id: 'social', label: 'Social' },
];

export default function FeedContainer() {
  const dispatch = useAppDispatch();
  const { selectedCategories } = useAppSelector((state) => state.preferences);
  const [orderedItems, setOrderedItems] = useState<FeedItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const category = selectedCategories[0] ?? 'technology';

  const { data: newsData,  isLoading: newsLoading  } = useGetTopHeadlinesQuery(category);
  const { data: movieData, isLoading: movieLoading } = useGetPopularMoviesQuery();

  const isLoading = newsLoading || movieLoading;

  useEffect(() => {
    if (!newsData && !movieData) return;

    const news   = newsData  ?? [];
    const movies = movieData ?? [];
    const social = mockSocialPosts;

    const combined: FeedItem[] = [];
    const maxLen = Math.max(news.length, movies.length, social.length);

    for (let i = 0; i < maxLen; i++) {
      if (news[i])   combined.push(news[i]);
      if (movies[i]) combined.push(movies[i]);
      if (social[i]) combined.push(social[i]);
    }

    setOrderedItems(combined);
    dispatch(setFeedItems(combined));
  }, [newsData, movieData, dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);
      dispatch(reorderCards(reordered.map((i) => i.id)));
      return reordered;
    });
  };

  const filteredItems =
    activeFilter === 'all'
      ? orderedItems
      : orderedItems.filter((i) => i.type === activeFilter);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!isLoading && filteredItems.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredItems.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <SortableCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      )}

      {!isLoading && filteredItems.length === 0 && (
        <EmptyState
          title="No content found"
          description="Update your preferences in Settings to see content here"
        />
      )}
    </div>
  );
}