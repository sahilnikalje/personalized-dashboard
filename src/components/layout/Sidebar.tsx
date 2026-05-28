'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, Heart, Settings, Zap, X, Menu, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useHasMounted } from '@/hooks/useHasMounted';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/features/auth/authSlice';
import { toast } from 'sonner';
import { cn } from '@/utils';

const navLinks = [
  { href: '/dashboard', label: 'Home',      icon: Home },
  { href: '/trending',  label: 'Trending',  icon: TrendingUp },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/settings',  label: 'Settings',  icon: Settings },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const dispatch  = useAppDispatch();
  const mounted   = useHasMounted();
  const { theme, setTheme } = useTheme();
  const user = useAppSelector((s) => s.auth.user);

  const isDark = theme === 'dark';

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out');
    router.replace('/login');
  };

  return (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-lg text-gray-900 dark:text-white">ContentHub</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon size={18} />
              {label}
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
        {/* Theme toggle */}
        {mounted ? (
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark
              ? <Sun size={16} className="text-yellow-400" />
              : <Moon size={16} className="text-slate-500" />
            }
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        ) : (
          <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 px-3 py-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.name?.[0] ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name ?? 'Guest'}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email ?? ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-screen sticky top-0 shrink-0">
        <NavContent />
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <Menu size={18} className="text-gray-700 dark:text-gray-300" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 z-50 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={16} className="text-gray-500" />
              </button>
              <NavContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}