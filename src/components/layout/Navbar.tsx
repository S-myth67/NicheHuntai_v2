import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { Menu, Search, Target } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'Methodology' },
]

export function Navbar() {
  const { user } = useAppStore()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white group-hover:bg-zinc-800 transition-colors shadow-sm">
              <Target className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-zinc-950 flex items-center gap-1.5">
                Niche<span className="text-black">Hunt</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-semibold tracking-wider">
                  PRO
                </span>
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
            <span className="font-mono text-zinc-900 font-semibold">4,820</span> niches indexed across 48 domains
          </div>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:text-black hover:bg-zinc-50 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-zinc-600 hover:text-black hover:bg-zinc-100',
                    isActive && 'text-black bg-zinc-100 font-semibold',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200" />

          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-zinc-700 hover:text-black bg-zinc-50 border border-zinc-200 hover:border-zinc-300"
                >
                  <Search className="h-3 w-3 text-zinc-900" />
                  App Console
                </Link>
                <Link
                  to="/profile"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-xs font-semibold uppercase text-zinc-900 hover:border-black transition-colors"
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </Link>
              </>
            ) : (
              <>
                {!isDashboard && (
                  <Link
                    to="/auth/login"
                    className="px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-black"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800 active:scale-[0.98] shadow-sm"
                >
                  Explore Database
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2 text-sm text-zinc-700">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 transition hover:bg-zinc-100',
                    isActive && 'bg-zinc-100 text-black font-semibold',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 pt-3 border-t border-zinc-200 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 border border-zinc-300 px-3 py-2 text-center text-sm font-medium text-zinc-900"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-xs text-zinc-600"
                  >
                    Account Settings ({user.name})
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-center text-sm font-medium text-zinc-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-black px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Get Started Free
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
