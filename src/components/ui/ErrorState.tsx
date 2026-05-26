import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Something went wrong', onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950 flex items-center justify-center mb-4">
        <AlertCircle size={28} className="text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Oops!</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      )}
    </div>
  );
}