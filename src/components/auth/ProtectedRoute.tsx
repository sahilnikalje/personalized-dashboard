'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useHasMounted } from '@/hooks/useHasMounted';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const mounted  = useHasMounted();

  const isAuthenticated = useAppSelector((s) => s.auth?.isAuthenticated ?? false);

  const isAuthPage = pathname?.startsWith('/login');

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated && !isAuthPage) {
      router.replace('/login');
    }

    if (isAuthenticated && isAuthPage) {
      router.replace('/dashboard');
    }
  }, [mounted, isAuthenticated, isAuthPage, router]);

  if (!mounted) return null;

  if (!isAuthenticated && !isAuthPage) return null;

  return <>{children}</>;
}