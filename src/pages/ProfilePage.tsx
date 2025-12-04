import { useAppStore } from '@/store/appStore'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'

export function ProfilePage() {
  const { user, setUser } = useAppStore()
  const [name, setName] = useState(user?.name ?? '')

  usePageTitle('Profile & settings')

  if (!user) return null

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    setUser({ ...user, name: name || user.name })
  }

  const handleDelete = () => {
    setUser(null)
  }

  return (
    <DashboardLayout title="Profile & settings">
      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200">
        <form
          onSubmit={handleSave}
          className="space-y-3"
        >
          <div>
            <label className="block text-xs font-medium text-slate-200">
              Display name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 h-9 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-200">
              Email
            </label>
            <p className="mt-1 text-xs text-slate-300">{user.email}</p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/25 hover:bg-emerald-400"
          >
            Save changes
          </button>
        </form>

        <div className="mt-4 grid gap-3 text-xs text-slate-300 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="font-semibold text-slate-100">
              Subscription
            </p>
            <p className="mt-1 text-slate-300 capitalize">
              Current plan: {user.plan}
            </p>
            <p className="mt-1 text-slate-400">
              Visit the Pricing page to upgrade to Pro or Enterprise in this demo.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="font-semibold text-slate-100">
              Data & account
            </p>
            <p className="mt-1 text-slate-400">
              This demo stores your account locally in your browser only. You can
              clear it at any time.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-900"
              >
                Download my data (mock)
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg border border-rose-500/60 px-3 py-1 text-[11px] text-rose-300 hover:bg-rose-500/10"
              >
                Delete account (demo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

