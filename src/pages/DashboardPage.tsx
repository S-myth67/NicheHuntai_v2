import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { SearchPanel } from '@/components/dashboard/SearchPanel'
import { HistoryPanel } from '@/components/dashboard/HistoryPanel'

export function DashboardPage() {
  return (
    <DashboardLayout title="Your niche hunts">
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SearchPanel />
        <HistoryPanel />
      </div>
    </DashboardLayout>
  )
}

