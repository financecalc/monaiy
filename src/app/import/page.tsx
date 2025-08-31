import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ImportContent } from '@/components/import/import-content';

export default function ImportPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <DashboardNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <ImportContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
