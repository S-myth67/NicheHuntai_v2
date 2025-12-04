import { useAppStore } from '@/store/appStore'
import { LogOut } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface DashboardLayoutProps {
  title: string
  children: ReactNode
}

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const { user, setUser } = useAppStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  if (!user) return null

  return (
    <main className="bg-slate-950">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-56 flex-shrink-0 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200 md:block">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold uppercase text-emerald-300">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-50">
                {user.name}
              </p>
              <p className="text-[11px] text-slate-400">{user.email}</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-emerald-500/40 bg-slate-900 px-2 py-1.5 text-[11px] text-emerald-300">
            {user.plan.toUpperCase()} plan
          </div>
          <nav className="mt-6 space-y-2 text-[13px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Overview
            </p>
            <p className="rounded-md bg-slate-800 px-2 py-1.5 text-slate-50">
              Niche hunts
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[11px] text-slate-400 hover:bg-slate-800"
            >
              <LogOut className="h-3 w-3" />
              Log out
            </button>
          </nav>
        </aside>
        <section className="flex-1">
          <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-50">
                {title}
              </h1>
              <p className="text-xs text-slate-400">
                Discover AI-simulated niches, profit ranges, and launch plans.
              </p>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  )
}


