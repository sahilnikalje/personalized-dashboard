'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { store, persistor } from '@/store';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="contenthub-theme"
          disableTransitionOnChange={false}
        >
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}