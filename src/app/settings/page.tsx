'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleCategory } from '@/features/preferences/preferencesSlice';
import { useTheme } from 'next-themes';
import { useHasMounted } from '@/hooks/useHasMounted';
import { toast } from 'sonner';
import { CATEGORIES } from '@/constants';
import { Settings, Moon, Sun, Check } from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const mounted = useHasMounted();
  const { selectedCategories } = useAppSelector((state) => state.preferences);
  const { theme, setTheme } = useTheme();

  const handleToggle = (id: string) => {
    if (selectedCategories.includes(id) && selectedCategories.length === 1) {
      toast.error('Keep at least one category selected');
      return;
    }
    dispatch(toggleCategory(id));
    toast.success('Preferences saved');
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Settings size={16} className="text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Customize your dashboard experience</p>
        </motion.div>

        {/* Appearance — only render after mount so theme value is real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-4"
        >
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>

          {!mounted ? (
            // Placeholder while theme loads — avoids layout shift
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {(['light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    toast.success(`${t === 'dark' ? 'Dark' : 'Light'} mode enabled`);
                  }}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    theme === t
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {t === 'dark'
                    ? <Moon size={18} className="text-slate-500 dark:text-slate-300" />
                    : <Sun size={18} className="text-yellow-500" />
                  }
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {t} Mode
                  </span>
                  {theme === t && <Check size={14} className="ml-auto text-blue-500" />}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Content Categories</h2>
          <p className="text-xs text-gray-400 mb-5">Select what appears in your personalized feed</p>

          {!mounted ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-9 w-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const selected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleToggle(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                    {selected && <Check size={12} />}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}