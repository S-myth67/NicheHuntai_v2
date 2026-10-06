import { Link } from 'react-router-dom'
import { Target } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 text-zinc-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-200">
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white">
                <Target className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-zinc-950">
                Niche<span className="text-black">Hunt</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Real-time market intelligence and whitespace analysis for independent founders, developers, and consultants. Sourced from real buyer signals.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-mono text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              <span>All Systems Operational · v2.4.0</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-mono font-bold uppercase tracking-wider text-zinc-900">Product</p>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-black transition">
                  Whitespace Explorer
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-black transition">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-black transition">
                  Research Methodology
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="hover:text-black transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-mono font-bold uppercase tracking-wider text-zinc-900">Resources</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-black transition">
                  Whitespace Playbooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Signal Extraction Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-mono">
          <p>© {new Date().getFullYear()} NicheHunt Inc. Built for independent builders.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-900 transition">Twitter / X</a>
            <a href="#" className="hover:text-zinc-900 transition">GitHub</a>
            <a href="#" className="hover:text-zinc-900 transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
