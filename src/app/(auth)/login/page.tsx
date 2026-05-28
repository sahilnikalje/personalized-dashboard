'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { login } from '@/features/auth/authSlice';
import { toast } from 'sonner';
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react';

const MOCK_USERS = [
  { email: 'demo@contenthub.com', password: 'demo1234', name: 'Demo User' },
  { email: 'sahil@contenthub.com', password: 'sahil123', name: 'Sahil' },
];

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email)                         e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email  = 'Enter a valid email';
    if (!password)                      e.password = 'Password is required';
    else if (password.length < 6)       e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    const matched = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (matched) {
      dispatch(
        login({
          name: matched.name,
          email: matched.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${matched.name}`,
        })
      );
      toast.success(`Welcome back, ${matched.name}!`);
      router.push('/dashboard');
    } 
    else {
      toast.error('Invalid email or password');
      setErrors({ password: 'Invalid credentials' });
    }

    setLoading(false);
  };

  const fillDemo = () => {
    setEmail('demo@contenthub.com');
    setPassword('demo1234');
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      {/* Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/40 p-8">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">ContentHub</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
          Sign in to your personalized dashboard
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
            placeholder="you@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
              errors.email
                ? 'border-red-400 dark:border-red-500'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                errors.password
                  ? 'border-red-400 dark:border-red-500'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/*// Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 mb-3"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Demo fill button */}
        <button
          onClick={fillDemo}
          className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Use demo credentials
        </button>

        {/* Hint */}
        <p className="text-xs text-center text-gray-400 mt-5">
          Demo: demo@contenthub.com / demo1234
        </p>
      </div>
    </motion.div>
  );
}