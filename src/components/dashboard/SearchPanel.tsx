import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { runMockNicheSearch } from '@/lib/mockSearch'
import type { NicheCategory, NicheCostLevel, NicheSearchResult } from '@/types/niche'
import { NicheCard } from '@/components/dashboard/NicheCard'
import { useAppStore } from '@/store/appStore'

type CategoryOption = {
  value: NicheCategory
  label: string
}

const categoryOptions: CategoryOption[] = [
  { value: 'all', label: 'All types' },
  { value: 'jobs', label: 'Jobs only' },
  { value: 'business', label: 'Business ideas' },
  { value: 'side-hustles', label: 'Side hustles' },
]

type CostOption = {
  value: NicheCostLevel | 'any'
  label: string
}

const costOptions: CostOption[] = [
  { value: 'any', label: 'Any cost' },
  { value: 'low', label: 'Low-cost entry' },
  { value: 'medium', label: 'Medium investment' },
  { value: 'high', label: 'High investment' },
]

export function SearchPanel() {
  const [profession, setProfession] = useState('')
  const [category, setCategory] = useState<NicheCategory>('all')
  const [costLevel, setCostLevel] = useState<CostOption['value']>('any')

  const { user, addSearchHistory } = useAppStore()

  const [searchCount, setSearchCount] = useState(0)

  const isFreeUser = user?.plan === 'free'
  const freeLimit = 3
  const reachedLimit = isFreeUser && searchCount >= freeLimit

  const mutation = useMutation<NicheSearchResult>({
    mutationFn: () =>
      runMockNicheSearch({
        profession: profession.trim(),
        filters: {
          category,
          costLevel,
        },
      }),
    onSuccess: (result) => {
      setSearchCount((count) => count + 1)
      addSearchHistory({
        id: result.requestId,
        profession: result.query.profession,
        createdAt: result.createdAt,
        resultCount: result.ideas.length,
      })
    },
  })

  const canSearch = profession.trim().length > 0 && !mutation.isPending && !reachedLimit

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!canSearch) return
    mutation.mutate()
  }

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
      >
        <label className="block text-xs font-medium text-slate-200">
          What profession or skill do you want to explore?
        </label>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            placeholder="e.g. fitness trainer for parents, senior frontend engineer"
            className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
          />
          <button
            type="submit"
            disabled={!canSearch}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 disabled:opacity-50"
          >
            {mutation.isPending ? 'Hunting...' : 'Hunt now'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setCategory(option.value)}
                className={`rounded-full px-3 py-1 ${
                  category === option.value
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <select
            value={costLevel}
            onChange={(event) => setCostLevel(event.target.value as CostOption['value'])}
            className="h-8 rounded-lg border border-slate-700 bg-slate-950 px-2 text-[11px] text-slate-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
          >
            {costOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {isFreeUser && (
          <p className="mt-1 text-[11px] text-amber-300">
            Free plan: {searchCount}/{freeLimit} full hunts used this session. Upgrade
            on the Pricing page for unlimited searches and deeper reports.
          </p>
        )}
      </form>

      <AnimatePresence mode="wait">
        {mutation.isPending && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300"
          >
            <p className="flex items-center gap-2">
              <span className="relative inline-flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Simulating AI-powered research across forums, social media, and trend
              reports...
            </p>
          </motion.div>
        )}

        {mutation.data && !mutation.isPending && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <p>
                Showing {mutation.data.ideas.length} AI-simulated niches for{' '}
                <span className="font-medium text-emerald-300">
                  {mutation.data.query.profession}
                </span>
                .
              </p>
            </div>
            <div className="space-y-3">
              {mutation.data.ideas.map((idea) => (
                <NicheCard
                  key={idea.id}
                  idea={idea}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {reachedLimit && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-[11px] text-amber-100">
          <p className="font-semibold">
            You&apos;ve hit the Free plan search limit.
          </p>
          <p className="mt-1">
            Visit the Pricing page to upgrade to Pro for unlimited hunts, deeper
            competition analysis, and exportable reports.
          </p>
        </div>
      )}
    </div>
  )
}


