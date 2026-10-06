import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Search, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  ChevronRight,
  Sliders,
  ExternalLink,
  Flame,
  Copy,
  Check
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface NicheOpportunity {
  id: string
  category: string
  title: string
  subtitle: string
  demandScore: number
  growthRate: string
  competition: 'Low' | 'Medium' | 'Blue Ocean'
  pricingModel: string
  estimatedMRR: string
  sourcePlatform: string
  realQuote: string
  audience: string
  playbook: {
    step1: string
    step2: string
    step3: string
    step4: string
  }
}

const OPPORTUNITIES: NicheOpportunity[] = [
  {
    id: 'niche-1',
    category: 'Productized Services',
    title: 'PostgreSQL Performance & Index Audits for Fast-Growing Startups',
    subtitle: 'Async 48-hour query profiling and indexing roadmap for Series A teams experiencing slow endpoints.',
    demandScore: 96,
    growthRate: '+184% YoY',
    competition: 'Blue Ocean',
    pricingModel: '$1,950 / one-time audit + $800/mo retainer',
    estimatedMRR: '$8,000 - $18,000 / mo',
    sourcePlatform: 'Hacker News & r/devops',
    realQuote: '"Our Postgres CPU spikes to 95% every Tuesday and our engineers spend 3 days arguing about indexing rather than shipping features."',
    audience: 'CTOs & Lead Engineers at 10-40 person SaaS startups',
    playbook: {
      step1: 'Target startups announcing Series A on TechCrunch or Workatastartup.',
      step2: 'Offer free 15-minute diagnostic script checking pg_stat_statements.',
      step3: 'Deliver structured Loom video + actionable GitHub PR recommendations.',
      step4: 'Upsell monthly proactive slow-query monitoring retainer.',
    },
  },
  {
    id: 'niche-2',
    category: 'B2B Micro-SaaS',
    title: 'Stripe Failed Payment Recovery for European Subscription SaaS',
    subtitle: 'SEPA Direct Debit and local card smart retries with GDPR-compliant WhatsApp & SMS reminders.',
    demandScore: 94,
    growthRate: '+142% YoY',
    competition: 'Low',
    pricingModel: '$99/mo + 1.5% recovered revenue',
    estimatedMRR: '$5,000 - $22,000 / mo',
    sourcePlatform: 'r/SaaS & Indie Hackers',
    realQuote: '"Churnkey and Baremetrics Dunning don\'t handle localized European SEPA notifications properly. We lose ~$4k/mo in passive churn."',
    audience: 'Bootstrapped European SaaS founders ($10k-$100k MRR)',
    playbook: {
      step1: 'Build lightweight webhook listener that intercepts invoice.payment_failed events.',
      step2: 'Create localized email + SMS templates in German, French, Dutch, and English.',
      step3: 'Launch with 14-day free trial on Stripe App Marketplace.',
      step4: 'Calculate exact recovered dollars in dashboard to prove ROI in 48 hours.',
    },
  },
  {
    id: 'niche-3',
    category: 'Health & Coaching',
    title: 'Micro-Habit Mobility Coaching for Remote Software Engineers',
    subtitle: 'Productized ergonomic and thoracic mobility routines delivered async via Slack/Discord bots.',
    demandScore: 89,
    growthRate: '+98% YoY',
    competition: 'Low',
    pricingModel: '$150/mo per engineer (B2B team expense)',
    estimatedMRR: '$6,000 - $15,000 / mo',
    sourcePlatform: 'r/remotework & LinkedIn',
    realQuote: '"I sit 11 hours a day coding. My neck and wrists are constantly inflamed, but I don\'t have time for a 1-hour gym visit during sprints."',
    audience: 'Engineering managers with wellness stipends & remote devs',
    playbook: {
      step1: 'Record 3-minute desk-friendly thoracic and wrist decompression video sequences.',
      step2: 'Package as a company wellness benefit expensable under remote equipment budgets.',
      step3: 'Distribute weekly accountability check-ins via Slack bot.',
      step4: 'Partner with remote developer communities and bootcamps.',
    },
  },
  {
    id: 'niche-4',
    category: 'E-Commerce & Ops',
    title: 'Shopify Returns Reduction & Sizing Intelligence for Footwear DTC',
    subtitle: 'Interactive quiz and exchange workflow that slashes return freight costs for boutique shoe brands.',
    demandScore: 92,
    growthRate: '+125% YoY',
    competition: 'Medium',
    pricingModel: '$249/mo base + $0.50/exchange',
    estimatedMRR: '$10,000 - $30,000 / mo',
    sourcePlatform: 'Shopify Community & r/ecommerce',
    realQuote: '"Our return rate on leather boots is 28% because half-sizes vary by European manufacturer. It is completely eating our margins."',
    audience: 'DTC footwear and apparel brands doing $500k-$5M annual GMV',
    playbook: {
      step1: 'Map size variations across 10 top footwear brands into structured data.',
      step2: 'Embed a 2-step sizing advisor widget on product pages.',
      step3: 'Incentivize size exchanges over refunds during return flow.',
      step4: 'Reach out to Shopify merchants with 50+ footwear SKUs on BuiltWith.',
    },
  },
  {
    id: 'niche-5',
    category: 'Developer Tools',
    title: 'SOC2 Compliance Evidence Collector for Supabase & Vercel Stacks',
    subtitle: 'Automated script collection for AWS/Supabase access logs, backups, and GitHub branch protection.',
    demandScore: 97,
    growthRate: '+210% YoY',
    competition: 'Blue Ocean',
    pricingModel: '$2,500 setup + $350/mo audit guarantee',
    estimatedMRR: '$12,000 - $35,000 / mo',
    sourcePlatform: 'Y Combinator Forums & Twitter/X',
    realQuote: '"Vanta costs $15k/year and requires full AWS setups. We are 4 people on Vercel + Supabase and just need quick SOC2 Type 1 evidence."',
    audience: 'Early-stage B2B startups closing their first enterprise pilots',
    playbook: {
      step1: 'Build automated Terraform / API scripts exporting user access logs and audit trails.',
      step2: 'Package pre-filled security policies tailored for modern serverless architectures.',
      step3: 'Offer fixed-timeline 2-week readiness guarantee for auditor review.',
      step4: 'Partner with boutique cybersecurity auditing firms for warm client referrals.',
    },
  },
  {
    id: 'niche-6',
    category: 'Productized Services',
    title: 'Figma to Production Tailwind Design System Migration',
    subtitle: 'Surgical refactoring of legacy CSS or chaotic styled-components into strict Tailwind CSS design tokens.',
    demandScore: 91,
    growthRate: '+115% YoY',
    competition: 'Low',
    pricingModel: '$3,500 / project (3-5 day turnaround)',
    estimatedMRR: '$7,000 - $14,000 / mo',
    sourcePlatform: 'Reddit r/reactjs & Designer News',
    realQuote: '"Our frontend has 14 different shades of blue and 6 button styles. Our designers hand off Figma components that devs can\'t map."',
    audience: 'Growth-stage web products redesigning their customer portal',
    playbook: {
      step1: 'Extract colors, spacing, and typography scales directly from client Figma files.',
      step2: 'Generate custom tailwind.config and unified atomic React component primitives.',
      step3: 'Submit clean, well-tested GitHub PR with Storybook documentation.',
      step4: 'Upsell monthly component maintenance retainers.',
    },
  },
]

const CATEGORIES = [
  'All Categories',
  'Productized Services',
  'B2B Micro-SaaS',
  'Developer Tools',
  'Health & Coaching',
  'E-Commerce & Ops',
]

const LIVE_SIGNALS = [
  {
    source: 'r/SaaS',
    time: '22m ago',
    tag: 'Complaint',
    title: 'Looking for a simple webhook dispatcher with replay debugging that costs under $50/mo',
    replies: '34 replies',
    nicheHint: 'B2B Developer Tooling',
  },
  {
    source: 'Hacker News',
    time: '1h ago',
    tag: 'High Demand',
    title: 'Anyone know a service that manages open-source LLM evals without full ML Ops complexity?',
    replies: '56 replies',
    nicheHint: 'AI Testing / Evaluation Service',
  },
  {
    source: 'Upwork',
    time: '3h ago',
    tag: '$2,500 Budget',
    title: 'Need someone to automate our dental practice inventory sync with QuickBooks',
    replies: '8 proposals',
    nicheHint: 'Vertical Automation Agency',
  },
  {
    source: 'Indie Hackers',
    time: '4h ago',
    tag: 'Whitespace',
    title: 'Substack writers need better email analytics to track sponsor click-through conversions',
    replies: '19 replies',
    nicheHint: 'Newsletter Tech / Analytics',
  },
]

export function LandingPage() {
  const explorerRef = useRef<HTMLDivElement | null>(null)
  const calculatorRef = useRef<HTMLDivElement | null>(null)

  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedNicheId, setExpandedNicheId] = useState<string | null>('niche-1')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Interactive Calculator State
  const [calcSkill, setCalcSkill] = useState<'dev' | 'design' | 'marketing' | 'ops' | 'coaching'>('dev')
  const [calcAudience, setCalcAudience] = useState<'b2b_saas' | 'local_business' | 'ecom' | 'creators'>('b2b_saas')
  const [calcModel, setCalcModel] = useState<'micro_saas' | 'retainer' | 'productized'>('productized')

  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.audience.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [selectedCategory, searchQuery])

  const handleCopyPlaybook = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const calculatedViability = useMemo(() => {
    let score = 84
    let mrr = '$6,000 - $14,000'
    let timeDays = '14-21 days'
    let angle = 'High-margin specialized problem solver'

    if (calcSkill === 'dev' && calcAudience === 'b2b_saas') {
      score = 96
      mrr = '$10,000 - $25,000'
      timeDays = '10-14 days'
      angle = 'Technical bottleneck reduction & security automation'
    } else if (calcSkill === 'design' && calcAudience === 'ecom') {
      score = 91
      mrr = '$8,000 - $18,000'
      timeDays = '12-16 days'
      angle = 'Conversion rate optimization & checkout UX audits'
    } else if (calcSkill === 'marketing' && calcAudience === 'b2b_saas') {
      score = 93
      mrr = '$9,000 - $22,000'
      timeDays = '14-18 days'
      angle = 'Bottom-of-funnel competitor comparison page engine'
    } else if (calcSkill === 'ops' && calcAudience === 'local_business') {
      score = 88
      mrr = '$5,000 - $12,000'
      timeDays = '7-12 days'
      angle = 'No-code appointment & billing workflow consolidation'
    } else if (calcSkill === 'coaching') {
      score = 86
      mrr = '$4,500 - $10,000'
      timeDays = '10-15 days'
      angle = 'Asynchronous micro-coaching with structured weekly checkpoints'
    }

    if (calcModel === 'retainer') {
      score += 2
    } else if (calcModel === 'micro_saas') {
      score -= 1
    }

    return { score, mrr, timeDays, angle }
  }, [calcSkill, calcAudience, calcModel])

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 pt-16 pb-20 md:pt-24 md:pb-28 bg-white">
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Monospace Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono text-zinc-800 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
              <span className="font-bold text-black">MARKET WHITESPACE RADAR</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600 font-medium">Updated Real-Time</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl md:leading-[1.1]">
              Find profitable micro-niches before they get crowded.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Stop guessing what to build. NicheHunt extracts high-intent buyer complaints, 
              community discussions, and unserved market gaps across Reddit, Hacker News, 
              and job boards into validated business playbooks.
            </p>

            {/* CTA Group */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => explorerRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-xs font-bold tracking-wider uppercase text-white transition hover:bg-zinc-800 active:scale-[0.98] shadow-sm"
              >
                <Search className="h-4 w-4" />
                Explore Niche Database
              </button>
              <button
                type="button"
                onClick={() => calculatorRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-50 hover:border-zinc-400 hover:text-black shadow-sm"
              >
                <Sliders className="h-4 w-4 text-black" />
                Test Your Niche Score
              </button>
            </div>

            {/* Real Stats Bar */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-zinc-950">4,820+</p>
                <p className="mt-1 text-xs text-zinc-500 font-medium">Validated Niches Indexed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-zinc-950">78.4%</p>
                <p className="mt-1 text-xs text-zinc-500 font-medium">Avg Target Gross Margin</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-zinc-950">12 Days</p>
                <p className="mt-1 text-xs text-zinc-500 font-medium">Avg Time to First Lead</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-zinc-950">100%</p>
                <p className="mt-1 text-xs text-zinc-500 font-medium">Sourced from Real Buyers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Signals Ticker / Stream */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-900">
              <Flame className="h-4 w-4 text-black" />
              <span>Live Buyer Demand Stream</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 flex-1">
              {LIVE_SIGNALS.map((signal, idx) => (
                <div 
                  key={idx}
                  className="rounded-lg border border-zinc-200 bg-white p-3 text-xs shadow-sm hover:border-zinc-400 transition"
                >
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5">
                    <span className="font-bold text-black">{signal.source}</span>
                    <span className="font-mono text-[10px] text-zinc-400">{signal.time}</span>
                  </div>
                  <p className="text-zinc-800 line-clamp-2 leading-relaxed font-medium">
                    {signal.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-zinc-100 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono font-semibold">
                      {signal.tag}
                    </span>
                    <span className="text-zinc-500 font-medium">{signal.nicheHint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Database & Explorer */}
      <section ref={explorerRef} className="py-16 md:py-24 border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-900">
                <Target className="h-3.5 w-3.5 text-black" />
                <span>Interactive Whitespace Directory</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                Explore Validated Market Opportunities
              </h2>
              <p className="mt-2 text-sm text-zinc-600 max-w-xl">
                Filter by business model, industry vertical, and search query. Each entry includes actual buyer quotes, viability metrics, and a 4-step go-to-market blueprint.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full md:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search keywords (e.g. Postgres, Shopify, Wellness)..."
                  className="w-full rounded-lg border border-zinc-300 bg-white pl-9 pr-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black font-medium shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filteredOpportunities.map((niche) => {
              const isExpanded = expandedNicheId === niche.id
              return (
                <div
                  key={niche.id}
                  className={`rounded-xl border transition-all duration-200 bg-white overflow-hidden ${
                    isExpanded
                      ? 'border-black shadow-lg ring-1 ring-black'
                      : 'border-zinc-200 hover:border-zinc-400 shadow-sm'
                  }`}
                >
                  <div className="p-5">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-mono font-semibold text-zinc-800 border border-zinc-200">
                          {niche.category}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-[11px] font-mono font-bold ${
                            niche.competition === 'Blue Ocean'
                              ? 'bg-black text-white'
                              : 'bg-zinc-100 text-zinc-900 border border-zinc-300'
                          }`}
                        >
                          {niche.competition} Competition
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-lg">
                        <TrendingUp className="h-3.5 w-3.5 text-black" />
                        <span className="text-xs font-mono font-bold text-zinc-950">
                          Score: {niche.demandScore}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                          ({niche.growthRate})
                        </span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="mt-3 text-base font-bold text-zinc-950 leading-snug">
                      {niche.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                      {niche.subtitle}
                    </p>

                    {/* Real Quote Box */}
                    <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-700 font-bold mb-1">
                        <MessageSquare className="h-3 w-3 text-black" />
                        <span>Real Buyer Signal ({niche.sourcePlatform}):</span>
                      </div>
                      <p className="text-xs text-zinc-700 italic font-sans leading-relaxed">
                        {niche.realQuote}
                      </p>
                    </div>

                    {/* Metrics Strip */}
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-3 text-xs">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-medium">Target Pricing:</span>
                        <p className="font-mono text-xs font-bold text-zinc-900 mt-0.5">
                          {niche.pricingModel}
                        </p>
                      </div>
                      <div>
                        <span className="text-[11px] text-zinc-500 font-medium">Est. Revenue Potential:</span>
                        <p className="font-mono text-xs font-bold text-black mt-0.5">
                          {niche.estimatedMRR}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Playbook Button */}
                    <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={() => setExpandedNicheId(isExpanded ? null : niche.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-zinc-700 transition"
                      >
                        <span>{isExpanded ? 'Hide Validation Playbook' : 'View 4-Step Playbook'}</span>
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyPlaybook(
                            niche.id,
                            `Niche: ${niche.title}\nTarget Audience: ${niche.audience}\nPricing: ${niche.pricingModel}\n\nPlaybook:\n1. ${niche.playbook.step1}\n2. ${niche.playbook.step2}\n3. ${niche.playbook.step3}\n4. ${niche.playbook.step4}`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-black transition"
                      >
                        {copiedId === niche.id ? (
                          <>
                            <Check className="h-3 w-3 text-black" />
                            <span className="text-black font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-zinc-600" />
                            <span>Copy Blueprint</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Playbook Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-zinc-200 bg-zinc-50 px-5 py-4"
                      >
                        <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-3">
                          Actionable Execution Plan:
                        </p>
                        <div className="space-y-2.5 text-xs">
                          <div className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black font-mono text-[10px] font-bold text-white">
                              01
                            </span>
                            <div>
                              <span className="font-bold text-zinc-900">Customer Identification:</span>{' '}
                              <span className="text-zinc-600">{niche.playbook.step1}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black font-mono text-[10px] font-bold text-white">
                              02
                            </span>
                            <div>
                              <span className="font-bold text-zinc-900">The Trojan-Horse Offer:</span>{' '}
                              <span className="text-zinc-600">{niche.playbook.step2}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black font-mono text-[10px] font-bold text-white">
                              03
                            </span>
                            <div>
                              <span className="font-bold text-zinc-900">Proof & Delivery:</span>{' '}
                              <span className="text-zinc-600">{niche.playbook.step3}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black font-mono text-[10px] font-bold text-white">
                              04
                            </span>
                            <div>
                              <span className="font-bold text-zinc-900">Expansion & Retainer:</span>{' '}
                              <span className="text-zinc-600">{niche.playbook.step4}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-600">
                          <span>Target ICP: <strong className="text-zinc-900">{niche.audience}</strong></span>
                          <Link to="/auth/signup" className="text-black font-bold hover:underline flex items-center gap-1">
                            Export Full Dossier <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-12 text-center">
              <p className="text-sm font-bold text-zinc-900">No niches found matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="mt-1 text-xs text-zinc-500">Try searching for broader keywords like &quot;developer&quot;, &quot;service&quot;, or &quot;Shopify&quot;.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All Categories')
                }}
                className="mt-4 rounded-lg bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Whitespace Calculator */}
      <section ref={calculatorRef} className="py-16 md:py-24 border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-black">
              <Sliders className="h-3.5 w-3.5" />
              <span>Interactive Opportunity Simulator</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Simulate Your Custom Niche Viability Score
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Configure your core skill set, preferred target audience, and business delivery model to calculate immediate market viability, pricing ceilings, and time-to-revenue.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Form Controls */}
            <div className="lg:col-span-7 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              {/* Skill */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  1. Select Your Primary Skill Domain
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'dev', label: 'Full-Stack Dev' },
                    { id: 'design', label: 'UI / UX Design' },
                    { id: 'marketing', label: 'B2B Growth / Copy' },
                    { id: 'ops', label: 'Workflows & Automation' },
                    { id: 'coaching', label: 'Coaching / Training' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCalcSkill(item.id as any)}
                      className={`rounded-lg p-2.5 text-xs font-semibold border text-left transition ${
                        calcSkill === item.id
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  2. Select Target Customer Segment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'b2b_saas', label: 'Series A / Bootstrapped SaaS' },
                    { id: 'local_business', label: 'Healthcare & Legal Practices' },
                    { id: 'ecom', label: 'Shopify Plus / DTC Brands' },
                    { id: 'creators', label: 'Pro Creators & Newsletters' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCalcAudience(item.id as any)}
                      className={`rounded-lg p-2.5 text-xs font-semibold border text-left transition ${
                        calcAudience === item.id
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Model */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  3. Select Delivery Architecture
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'productized', label: 'Productized Sprint ($2k-$5k)' },
                    { id: 'retainer', label: 'Advisory Retainer ($1k-$3k/mo)' },
                    { id: 'micro_saas', label: 'Vertical Micro-SaaS ($49-$199/mo)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCalcModel(item.id as any)}
                      className={`rounded-lg p-2.5 text-xs font-semibold border text-left transition ${
                        calcModel === item.id
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 rounded-2xl border border-zinc-950 bg-black text-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Market Viability Analysis
                </span>
                <span className="rounded-full bg-white text-black px-2.5 py-0.5 text-xs font-mono font-bold">
                  Calculated
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold font-mono text-white">
                  {calculatedViability.score}
                </span>
                <span className="text-sm font-mono text-zinc-400">/ 100 Viability Index</span>
              </div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Recommended Value Positioning:</span>
                  <p className="mt-1 font-bold text-white text-sm">
                    {calculatedViability.angle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">
                    <span className="text-zinc-400 font-medium">Est. Revenue Ceiling:</span>
                    <p className="mt-1 font-mono font-bold text-white text-sm">
                      {calculatedViability.mrr}
                    </p>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">
                    <span className="text-zinc-400 font-medium">Speed to First Lead:</span>
                    <p className="mt-1 font-mono font-bold text-zinc-300 text-sm">
                      {calculatedViability.timeDays}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <Link
                  to="/auth/signup"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition shadow-sm"
                >
                  Save Configuration to Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Strategic Difference: Why Broad Building Fails */}
      <section className="py-16 md:py-24 border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Why 90% of builders fail before finding revenue
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              The difference between spending 6 months building into an empty room versus closing your first 3 clients in 14 days.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* The Old Way */}
            <div className="rounded-2xl border border-zinc-300 bg-zinc-50 p-6 md:p-8">
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <span>The Traditional Trap</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-4">
                Chasing broad, saturated horizontal markets
              </h3>
              <ul className="space-y-3 text-xs text-zinc-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-400 font-bold shrink-0">✕</span>
                  <span>&ldquo;I am going to build a new project management tool for everyone.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-400 font-bold shrink-0">✕</span>
                  <span>Competing directly against venture-backed companies spending $500k/mo on Google Ads.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-400 font-bold shrink-0">✕</span>
                  <span>Spending 4 months writing code before talking to a single paying customer.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-400 font-bold shrink-0">✕</span>
                  <span>Race to the bottom on $9/month pricing with 8% monthly churn.</span>
                </li>
              </ul>
            </div>

            {/* The NicheHunt Way */}
            <div className="rounded-2xl border border-black bg-zinc-950 text-white p-6 md:p-8 shadow-md">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <span>The NicheHunt Whitespace Strategy</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Targeting specific high-margin pain points
              </h3>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-bold shrink-0">✓</span>
                  <span>&ldquo;I build compliance audit scripts specifically for 5-person Supabase startups.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-bold shrink-0">✓</span>
                  <span>Zero direct competition because giant software ignores specialized sub-industries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-bold shrink-0">✓</span>
                  <span>Validated by direct quotes of founders complaining on forums before writing code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-bold shrink-0">✓</span>
                  <span>Commanding $500 - $3,500 per customer with near-zero churn.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Deep-Dive */}
      <section className="py-16 md:py-24 border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-200 pb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-bold">
                  Verified Blueprint Teardown
                </span>
                <h3 className="mt-2 text-2xl font-bold text-zinc-950">
                  Case Study: From freelance developer to $14,200/mo PostgreSQL performance consultancy
                </h3>
                <p className="mt-2 text-xs text-zinc-600 max-w-2xl">
                  How an engineer used NicheHunt whitespace data to stop applying for $40/hr Upwork gigs and productize a 48-hour database audit service.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-zinc-100 p-4 rounded-xl border border-zinc-200">
                <div className="text-center">
                  <p className="text-xs text-zinc-500 font-medium">Initial Price</p>
                  <p className="text-lg font-mono font-bold text-zinc-400 line-through">$40/hr</p>
                </div>
                <ArrowRight className="h-4 w-4 text-black" />
                <div className="text-center">
                  <p className="text-xs text-zinc-500 font-medium">New Offer</p>
                  <p className="text-lg font-mono font-bold text-black">$1,950 / audit</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3 text-xs">
              <div className="rounded-xl bg-zinc-50 p-4 border border-zinc-200">
                <p className="font-mono font-bold text-zinc-950 uppercase tracking-wide">1. The Trigger Signal</p>
                <p className="mt-2 text-zinc-600 leading-relaxed">
                  Identified 18 threads across r/devops and HN in 30 days where Series A startups struggled with unindexed slow queries causing AWS RDS CPU spikes.
                </p>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 border border-zinc-200">
                <p className="font-mono font-bold text-zinc-950 uppercase tracking-wide">2. The Frictionless Offer</p>
                <p className="mt-2 text-zinc-600 leading-relaxed">
                  Created a 1-line shell script that outputs query execution stats, sent custom Loom audits to 15 CTOs, and closed 4 audits in week one.
                </p>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 border border-zinc-200">
                <p className="font-mono font-bold text-zinc-950 uppercase tracking-wide">3. The Recurring Retainer</p>
                <p className="mt-2 text-zinc-600 leading-relaxed">
                  3 of the 4 audit clients converted into $800/month ongoing database performance monitoring retainers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 md:py-24 border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs text-zinc-500">
              Clear answers about our data methodology, sources, and verification.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Where do these niche opportunities come from?',
                a: 'Our intelligence pipeline ingests millions of public community posts, developer issues, freelance job postings, and search volume signals across Reddit, Hacker News, GitHub, and industry forums. We filter out noise and extract genuine commercial pain points where people are actively looking for solutions.',
              },
              {
                q: 'How is this different from asking ChatGPT for business ideas?',
                a: 'Standard LLMs give generic, recycled ideas like "build a social media scheduler" without any real-world demand verification or pricing context. NicheHunt links every opportunity directly to real forum discussions, buyer complaints, and calculated commercial viability scores.',
              },
              {
                q: 'Can I export the playbooks and reports?',
                a: 'Yes. All indexed niches include step-by-step outreach scripts, customer personas, pricing recommendations, and competitor breakdowns that can be copied or exported directly from your dashboard.',
              },
              {
                q: 'Do I need technical or coding skills to use these playbooks?',
                a: 'No. The directory includes opportunities tailored for developers, UI/UX designers, marketing consultants, operations experts, and vertical service providers.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <h4 className="text-sm font-bold text-zinc-950">{faq.q}</h4>
                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Start Your Discovery
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to find your high-margin market whitespace?
          </h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-xl mx-auto">
            Join thousands of independent founders, engineers, and consultants discovering untapped niches with real buyer demand.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/auth/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition shadow-sm"
            >
              Get Free Instant Access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition"
            >
              View Plan Options
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-zinc-500 font-mono">
            No credit card required · Instant access to database
          </p>
        </div>
      </section>
    </main>
  )
}
