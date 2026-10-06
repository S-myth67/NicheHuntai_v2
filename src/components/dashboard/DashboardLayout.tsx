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
    <main className="bg-white text-zinc-900 min-h-screen">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8 md:px-6">
        <aside className="hidden w-60 flex-shrink-0 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-800 md:block shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold uppercase text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-950">
                {user.name}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono">{user.email}</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-[11px] font-mono font-bold text-black shadow-xs">
            {user.plan.toUpperCase()} PLAN ACTIVE
          </div>
          <nav className="mt-6 space-y-2 text-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Workspace
            </p>
            <p className="rounded-lg bg-black px-3 py-2 text-white font-semibold">
              Niche Hunts & Dossiers
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 inline-flex w-full items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-black transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </nav>
        </aside>
        <section className="flex-1">
          <header className="mb-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between border-b border-zinc-200 pb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                {title}
              </h1>
              <p className="text-xs text-zinc-500">
                Search real-time whitespace opportunities, pricing models, and launch blueprints.
              </p>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  )
}
