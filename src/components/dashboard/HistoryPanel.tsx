import { useAppStore } from '@/store/appStore'

export function HistoryPanel() {
  const { searchHistory, savedNiches } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
          Saved Niches ({savedNiches.length})
        </h2>
        {savedNiches.length === 0 ? (
          <p className="mt-3 text-xs text-zinc-500">
            No saved niches yet. Click &quot;Save&quot; on any card to keep it here.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-xs">
            {savedNiches.map((niche) => (
              <li
                key={niche.id}
                className="rounded-lg border border-zinc-200 bg-white p-3 shadow-xs"
              >
                <p className="font-bold text-zinc-950">{niche.title}</p>
                <p className="mt-0.5 font-mono text-[11px] text-zinc-600">
                  {niche.estimatedRevenueRange}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
          Recent Searches ({searchHistory.length})
        </h2>
        {searchHistory.length === 0 ? (
          <p className="mt-3 text-xs text-zinc-500">
            Your recent hunt queries will appear here.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-xs">
            {searchHistory.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-2.5 text-zinc-800 shadow-xs"
              >
                <span className="font-medium">{item.profession}</span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {item.resultCount} ideas
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
