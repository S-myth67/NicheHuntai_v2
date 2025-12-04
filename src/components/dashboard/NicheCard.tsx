import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, BookmarkPlus, Share2 } from 'lucide-react'
import type { NicheIdea } from '@/types/niche'
import { useAppStore } from '@/store/appStore'

interface NicheCardProps {
  idea: NicheIdea
}

export function NicheCard({ idea }: NicheCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { saveNiche } = useAppStore()

  const handleSave = () => {
    saveNiche(idea)
  }

  const handleShare = async () => {
    const text = `${idea.title} – discovered via NicheHunt`
    if (navigator.share) {
      try {
        await navigator.share({ title: idea.title, text })
      } catch {
        // ignore
      }
      return
    }
    await navigator.clipboard.writeText(text)
  }

  return (
    <motion.article
      layout
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-50">
            {idea.title}
          </h3>
          <p className="mt-1 text-xs text-slate-300">{idea.summary}</p>
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
            <div>
              <dt className="inline text-slate-500">Revenue:</dt>{' '}
              <dd className="inline text-emerald-300">
                {idea.estimatedRevenueRange}
              </dd>
            </div>
            <div>
              <dt className="inline text-slate-500">ROI timeline:</dt>{' '}
              <dd className="inline">{idea.roiTimeline}</dd>
            </div>
            <div>
              <dt className="inline text-slate-500">Difficulty:</dt>{' '}
              <dd className="inline capitalize">{idea.difficulty}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-end gap-2 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 hover:bg-slate-900"
          >
            <BookmarkPlus className="h-3 w-3" />
            Save
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 hover:bg-slate-900"
          >
            <Share2 className="h-3 w-3" />
            Share
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-200"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-3 w-3" />
            Hide deep insights & sources
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3" />
            View deep insights & sources
          </>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-3 border-t border-slate-800 pt-3 text-[11px]"
          >
            <p className="font-semibold text-slate-200">Market insights</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-slate-300">
              {idea.insights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 font-semibold text-slate-200">Suggested steps</p>
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-slate-300">
              {idea.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 font-semibold text-slate-200">
              Simulated sources
            </p>
            <ul className="mt-1 space-y-1 text-slate-400">
              {idea.sources.map((source) => (
                <li key={source.id}>
                  {source.label}{' '}
                  <span className="text-slate-500">
                    ({source.platform ?? 'web'})
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}


