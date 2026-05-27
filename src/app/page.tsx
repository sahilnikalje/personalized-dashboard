import DashboardLayout from '@/components/layout/DashboardLayout';
import FeedContainer from '@/features/feed/components/FeedContainer';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Feed Preview</h1>
        <FeedContainer />
      </div>
    </DashboardLayout>
  );
}