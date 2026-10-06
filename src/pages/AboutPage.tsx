import { usePageTitle } from '@/hooks/usePageTitle'
import { Database, Layers, ShieldCheck } from 'lucide-react'

export function AboutPage() {
  usePageTitle('Methodology & Data Integrity')

  return (
    <main className="bg-white text-zinc-900 min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="border-b border-zinc-200 pb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-black font-bold">
            Methodology & Architecture
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
            How NicheHunt discovers validated market whitespace.
          </h1>
          <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
            Most market research is backward-looking or hallucinated by ungrounded AI models. 
            NicheHunt was built on a simple thesis: the highest-margin businesses solve specific, 
            urgent complaints that existing broad software ignores.
          </p>
        </div>

        <div className="mt-10 space-y-8 text-sm text-zinc-700">
          <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-zinc-950 font-bold text-base mb-3">
              <Database className="h-5 w-5 text-black" />
              <h2>1. Multi-Channel Signal Ingestion</h2>
            </div>
            <p className="leading-relaxed text-zinc-600">
              Our scrapers and search workers continuously ingest raw intent signals across thousands of public communities where buyers hang out:
            </p>
            <ul className="mt-3 space-y-2 text-xs text-zinc-600">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">·</span>
                <span><strong className="text-zinc-900">Public Developer & Startup Communities:</strong> Reddit (r/SaaS, r/devops, r/ecommerce), Hacker News &quot;Ask HN&quot;, and Indie Hackers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">·</span>
                <span><strong className="text-zinc-900">Commercial Demand Boards:</strong> Upwork fixed-price postings over $1,500, GitHub issues with over 20+ community reactions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">·</span>
                <span><strong className="text-zinc-900">Industry Search Spikes:</strong> Google Trends 90-day search velocity anomalies across B2B software categories.</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-zinc-950 font-bold text-base mb-3">
              <Layers className="h-5 w-5 text-black" />
              <h2>2. Commercial Viability & Saturation Scoring</h2>
            </div>
            <p className="leading-relaxed text-zinc-600">
              Raw signals are clustered by intent, filtered for spam and self-promotion, and passed through our viability scoring matrix:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl bg-white p-3.5 border border-zinc-200 shadow-sm">
                <strong className="text-zinc-950">Pain Urgency (0-40 pts):</strong>
                <p className="text-zinc-600 mt-1">Evaluates frequency of complaints and monetary loss caused by the current bottleneck.</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-zinc-200 shadow-sm">
                <strong className="text-zinc-950">Purchasing Power (0-30 pts):</strong>
                <p className="text-zinc-600 mt-1">Measures whether the target audience has dedicated software or consulting budget ($50-$2k+/mo).</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-zinc-200 shadow-sm">
                <strong className="text-zinc-950">Competitor Whitespace (0-20 pts):</strong>
                <p className="text-zinc-600 mt-1">Penalizes saturated horizontal red oceans while boosting neglected vertical niches.</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-zinc-200 shadow-sm">
                <strong className="text-zinc-950">GTM Clarity (0-10 pts):</strong>
                <p className="text-zinc-600 mt-1">Grades ease of customer identification (can you scrape a list of 50 target buyers in 1 hour?).</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-zinc-950 font-bold text-base mb-3">
              <ShieldCheck className="h-5 w-5 text-black" />
              <h2>3. Ethical Scraping & Data Integrity</h2>
            </div>
            <p className="leading-relaxed text-xs text-zinc-600">
              NicheHunt strictly respects platform Terms of Service, robots.txt directives, and user privacy. We do not collect private personal identifying information (PII). All insights represent aggregated public market sentiment designed to guide entrepreneurial decision-making.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
