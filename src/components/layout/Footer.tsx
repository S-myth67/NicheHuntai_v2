import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            NicheHunt
          </p>
          <p className="max-w-md text-xs md:text-sm">
            NicheHunt provides simulated AI-generated niche ideas for
            educational purposes only. Always perform your own research and
            consult professionals before making financial decisions.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-emerald-300">
              About
            </Link>
            <Link to="/pricing" className="hover:text-emerald-300">
              Pricing
            </Link>
            <a href="#" className="hover:text-emerald-300">
              Privacy
            </a>
            <a href="#" className="hover:text-emerald-300">
              Terms
            </a>
          </div>
          <div className="flex gap-3">
            <a href="#" aria-label="X / Twitter" className="hover:text-emerald-300">
              X
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-emerald-300">
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


