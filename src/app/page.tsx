import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading dashboard...</p>
      </div>
    </DashboardLayout>
  );
}