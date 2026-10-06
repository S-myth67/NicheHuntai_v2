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
        className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm"
      >
        <label className="block text-xs font-bold text-zinc-900">
          What profession or skill do you want to explore?
        </label>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            placeholder="e.g. fitness trainer for parents, senior frontend engineer"
            className="h-10 flex-1 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black shadow-sm"
          />
          <button
            type="submit"
            disabled={!canSearch}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-black px-5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {mutation.isPending ? 'Searching...' : 'Explore Niches'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600">
          <div className="flex flex-wrap gap-1.5">
            {categoryOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCategory(opt.value)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  category === opt.value
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {costOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCostLevel(opt.value)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  costLevel === opt.value
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {isFreeUser && (
          <p className="text-[11px] text-zinc-500 font-mono">
            Free searches remaining: {Math.max(0, freeLimit - searchCount)} of {freeLimit}
          </p>
        )}
      </form>

      <AnimatePresence mode="wait">
        {mutation.isPending && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center text-xs text-zinc-600"
          >
            Scanning forums, job boards, and commercial pain points for &ldquo;{profession}&rdquo;...
          </motion.div>
        )}

        {mutation.isSuccess && mutation.data && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-xs">
              <span className="font-bold text-zinc-950">
                Found {mutation.data.ideas.length} validated opportunities
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                Generated in 420ms
              </span>
            </div>

            <div className="space-y-4">
              {mutation.data.ideas.map((idea) => (
                <NicheCard key={idea.id} idea={idea} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
