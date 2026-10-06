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
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-800 shadow-sm">
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-xs"
        >
          <div>
            <label className="block text-xs font-bold text-zinc-900">
              Display name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-900">
              Email address
            </label>
            <p className="mt-1 text-xs font-mono text-zinc-600">{user.email}</p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-zinc-800 transition"
          >
            Save changes
          </button>
        </form>

        <div className="grid gap-4 text-xs md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs">
            <p className="font-bold text-zinc-950">
              Subscription
            </p>
            <p className="mt-1 text-zinc-700 capitalize font-medium">
              Current plan: <span className="font-bold uppercase font-mono">{user.plan}</span>
            </p>
            <p className="mt-1 text-zinc-500">
              Visit the Pricing page to upgrade to Pro or Enterprise in this demo.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs">
            <p className="font-bold text-zinc-950">
              Data & account
            </p>
            <p className="mt-1 text-zinc-500">
              This demo stores your account locally in your browser only. You can
              clear it at any time.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-800 hover:bg-zinc-100"
              >
                Download data (mock)
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-100"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
