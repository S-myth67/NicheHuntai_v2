import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
        404
      </p>
      <h1 className="text-4xl font-semibold text-emerald-400">
        Niche not found.
      </h1>
      <p className="max-w-md text-slate-300">
        The page you&apos;re hunting for doesn&apos;t exist yet.
        Try exploring another niche.
      </p>
      <div className="mt-4 flex gap-3">
        <Link
          to="/"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
        >
          Back to home
        </Link>
        <Link
          to="/dashboard"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-900"
        >
          Go to dashboard
        </Link>
      </div>
    </main>
  )
}


