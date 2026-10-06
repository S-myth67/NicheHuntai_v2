import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, BookmarkPlus, Share2, ExternalLink } from 'lucide-react'
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
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-zinc-950">
            {idea.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{idea.summary}</p>
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-600">
            <div>
              <dt className="inline text-zinc-400 font-medium">Revenue:</dt>{' '}
              <dd className="inline font-mono font-bold text-zinc-950">
                {idea.estimatedRevenueRange}
              </dd>
            </div>
            <div>
              <dt className="inline text-zinc-400 font-medium">ROI timeline:</dt>{' '}
              <dd className="inline font-medium text-zinc-800">{idea.roiTimeline}</dd>
            </div>
            <div>
              <dt className="inline text-zinc-400 font-medium">Difficulty:</dt>{' '}
              <dd className="inline capitalize font-medium text-zinc-800">{idea.difficulty}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700 hover:bg-zinc-100 hover:text-black font-semibold transition"
          >
            <BookmarkPlus className="h-3 w-3" />
            Save
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700 hover:bg-zinc-100 hover:text-black font-semibold transition"
          >
            <Share2 className="h-3 w-3" />
            Share
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-black hover:text-zinc-600 transition"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3.5 space-y-3 border-t border-zinc-100 pt-3 text-xs text-zinc-600"
          >
            {idea.insights && idea.insights.length > 0 && (
              <div>
                <p className="font-bold text-zinc-900 mb-1">Market Insights</p>
                <ul className="list-disc space-y-1 pl-4 text-zinc-600">
                  {idea.insights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
            {idea.steps && idea.steps.length > 0 && (
              <div>
                <p className="font-bold text-zinc-900 mb-1">Step-by-Step Launch Plan</p>
                <ol className="list-decimal space-y-1 pl-4 text-zinc-600">
                  {idea.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            {idea.sources && idea.sources.length > 0 && (
              <div>
                <p className="font-bold text-zinc-900 mb-1">Community Signals & Sources</p>
                <ul className="space-y-1 pl-1 font-mono text-[11px] text-zinc-500">
                  {idea.sources.map((src) => (
                    <li key={src.id} className="flex items-center gap-1.5">
                      <span>· {src.label}</span>
                      {src.platform && (
                        <span className="rounded bg-zinc-100 px-1 py-0.2 text-[10px] text-zinc-700">
                          {src.platform}
                        </span>
                      )}
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-black hover:underline"
                        >
                          <ExternalLink className="inline h-2.5 w-2.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
