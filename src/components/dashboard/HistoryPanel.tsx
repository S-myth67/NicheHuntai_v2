import { useAppStore } from '@/store/appStore'

export function HistoryPanel() {
  const { searchHistory } = useAppStore()

  if (searchHistory.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
        Your recent hunts will appear here, including when you ran them and how
        many ideas were returned.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-200">
      <h2 className="text-sm font-semibold text-slate-50">Recent hunts</h2>
      <ul className="mt-2 space-y-2">
        {searchHistory.slice(0, 10).map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2"
          >
            <div>
              <p className="text-xs font-medium text-emerald-300">
                {item.profession}
              </p>
              <p className="text-[11px] text-slate-400">
                {new Date(item.createdAt).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                · {item.resultCount} ideas
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


