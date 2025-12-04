import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

interface DemoNiche {
  id: string
  title: string
  summary: string
  hint: string
}

const demoNiches: DemoNiche[] = [
  {
    id: '1',
    title: 'Online Fitness Coaching for Remote Teams',
    summary:
      'Design short, science-backed movement breaks for distributed teams and sell B2B wellness subscriptions.',
    hint: 'Based on rising remote work and burnout discussions across r/remotework and LinkedIn.',
  },
  {
    id: '2',
    title: 'AI-Assisted Code Review for Indie SaaS Builders',
    summary:
      'Offer weekly AI-augmented code reviews tailored for solo founders shipping fast, with async Loom feedback.',
    hint: 'Inspired by indie hacker forums and X threads on shipping velocity vs. quality.',
  },
  {
    id: '3',
    title: 'Notion Systems for Busy Health Coaches',
    summary:
      'Package templates for onboarding, check-ins, and habit tracking; sell as productized systems plus setup.',
    hint: 'Rooted in Instagram and Reddit chatter on admin overload for solo coaches.',
  },
]

export function LandingPage() {
  const demoRef = useRef<HTMLDivElement | null>(null)

  const [profession, setProfession] = useState('fitness trainer')
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleScrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDemoSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setShowResults(false)

    window.setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 900)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      <section className="border-b border-slate-900 bg-[radial-gradient(circle_at_top,_#22c55e33,_#020617_60%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6">
          <div className="space-y-6 md:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/60 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              <span>AI-powered niche discovery for modern careers</span>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
              Unlock profitable niches in any profession with{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                AI-powered insights.
              </span>
            </h1>
            <p className="max-w-xl text-balance text-slate-300">
              NicheHunt scans forums, social feeds, and trend data to surface
              high-potential jobs, side hustles, and business ideas—plus
              step-by-step plans to get started.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleScrollToDemo}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                Start your niche hunt
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-slate-400">
                No credit card required. See live demo in seconds.
              </p>
            </div>
          </div>

          <div
            ref={demoRef}
            className="md:w-1/2"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-emerald-500/5 backdrop-blur">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Live demo
              </p>
              <form
                onSubmit={handleDemoSubmit}
                className="space-y-3"
              >
                <label className="block text-xs font-medium text-slate-300">
                  Profession or skill you want to explore
                </label>
                <div className="flex gap-2">
                  <input
                    value={profession}
                    onChange={(event) => setProfession(event.target.value)}
                    placeholder="e.g. fitness trainer, software developer"
                    className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400"
                    disabled={isLoading || !profession.trim()}
                  >
                    Hunt niches
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

              <div className="mt-4 space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                  Teaser results
                </p>
                <AnimatePresence mode="wait">
                  {isLoading && (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-slate-300"
                    >
                      <span className="relative inline-flex h-6 w-6 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span>
                        Scanning forums, social feeds, and trend data for{' '}
                        <span className="font-semibold text-emerald-300">
                          {profession || 'your profession'}
                        </span>
                        ...
                      </span>
                    </motion.div>
                  )}

                  {showResults && !isLoading && (
                    <motion.ul
                      key="results"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { staggerChildren: 0.08 },
                        },
                      }}
                      className="space-y-2.5"
                    >
                      {demoNiches.map((niche) => (
                        <motion.li
                          key={niche.id}
                          variants={{
                            hidden: { opacity: 0, y: 6 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5"
                        >
                          <p className="text-xs font-semibold text-emerald-300">
                            {niche.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-300">
                            {niche.summary}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            {niche.hint}
                          </p>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {!isLoading && !showResults && (
                  <p className="text-xs text-slate-500">
                    Try a profession above to see three AI-simulated niche
                    ideas. The full app unlocks deeper reports, competition
                    analysis, and step-by-step playbooks.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
            How it works
          </h2>
          <p className="mt-3 text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            From vague profession to validated niche in four steps.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Input profession',
                body: 'Tell NicheHunt where you are today—your job title, skills, or domain expertise.',
              },
              {
                step: '02',
                title: 'AI scans the web',
                body: 'We simulate research across forums, social media, job boards, and industry reports.',
              },
              {
                step: '03',
                title: 'Trends & gaps',
                body: 'Signals are clustered into emerging demand pockets, saturation levels, and price points.',
              },
              {
                step: '04',
                title: 'Actionable plan',
                body: 'You get niche ideas, revenue ranges, and step-by-step playbooks to test them quickly.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-xs font-mono text-emerald-300">
                  {item.step}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Loved by curious professionals
          </h2>
          <p className="mt-3 text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Testimonials from early beta users.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                name: 'Amina, Product Designer',
                quote:
                  'NicheHunt helped me niche down from generic UX work to a profitable focus on onboarding flows for B2B SaaS.',
              },
              {
                name: 'Ravi, Fitness Coach',
                quote:
                  'The market breakdowns gave me confidence to launch a remote coaching offer for busy engineers.',
              },
              {
                name: 'Jess, Data Analyst',
                quote:
                  'I used the AI-generated playbook to validate a tiny analytics-as-a-service offer in two weekends.',
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-sm text-slate-200">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-medium text-emerald-300">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}



