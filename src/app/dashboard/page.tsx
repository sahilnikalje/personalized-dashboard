'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FeedContainer from '@/features/feed/components/FeedContainer';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Newspaper, Film, Users, Flame } from 'lucide-react';

const STATS = [
  { label: 'News Articles', value: '1.2K+', icon: Newspaper, color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-950' },
  { label: 'Movies',        value: '500+',  icon: Film,      color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950' },
  { label: 'Social Posts',  value: '800+',  icon: Users,     color: 'text-green-500',  bg: 'bg-green-50 dark:bg-green-950' },
  { label: 'Trending Now',  value: '24',    icon: Flame,     color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950' },
];

export default function DashboardPage() {
  const { selectedCategories } = useAppSelector((state) => state.preferences);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Your Feed</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing content for:{' '}
            <span className="text-blue-500">{selectedCategories.join(', ')}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <FeedContainer />
      </div>
    </DashboardLayout>
  );
}