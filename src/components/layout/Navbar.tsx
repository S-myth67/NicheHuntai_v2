import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const { user } = useAppStore()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400" />
          <span className="text-lg font-semibold tracking-tight">
            Niche<span className="text-emerald-400">Hunt</span>
          </span>
        </Link>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-900 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-4 text-sm text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'transition-colors hover:text-emerald-300',
                    isActive && 'text-emerald-400',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200">
                  {user.plan} plan
                </span>
                <Link
                  to="/profile"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold uppercase text-emerald-300"
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </Link>
              </>
            ) : (
              <>
                {!isDashboard && (
                  <Link
                    to="/auth/login"
                    className="text-slate-200 transition-colors hover:text-emerald-300"
                  >
                    Log in
                  </Link>
                )}
                <Link
                  to="/auth/signup"
                  className="rounded-lg bg-emerald-500 px-4 py-1.5 font-medium text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400"
                >
                  Start free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm text-slate-200">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-2 py-1.5 hover:bg-slate-900',
                    isActive && 'text-emerald-400',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-2 flex items-center gap-3">
              {user ? (
                <>
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200">
                    {user.plan} plan
                  </span>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold uppercase text-emerald-300"
                  >
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-md border border-slate-700 px-3 py-1.5 text-center hover:bg-slate-900"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-md bg-emerald-500 px-3 py-1.5 text-center font-medium text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400"
                  >
                    Start free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


