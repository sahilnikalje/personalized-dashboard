export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200 dark:bg-gray-800" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-1/4 mt-2" />
      </div>
    </div>
  );
}