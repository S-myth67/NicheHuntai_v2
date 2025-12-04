import { usePageTitle } from '@/hooks/usePageTitle'

export function AboutPage() {
  usePageTitle('About')

  return (
    <main className="bg-slate-950">
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
          The story behind NicheHunt.
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          NicheHunt was born from a simple question: why is it so hard for talented
          people to see the most profitable, ethical ways to use the skills they
          already have? Traditional career paths and job boards rarely surface tiny,
          high-potential niches—yet those are often where the best opportunities live.
        </p>

        <section className="mt-8 space-y-4 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-50">
            Our mission
          </h2>
          <p>
            We want to help ambitious professionals discover focused, sustainable
            opportunities—whether that&apos;s a specialized role, a side hustle, or a
            small but profitable business. NicheHunt does this by simulating the work
            of a dedicated researcher who reads forums, social feeds, and industry
            reports on your behalf.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-50">
            How the AI would work in production
          </h2>
          <p>
            In this demo, all insights are mocked for safety and speed. In a real
            deployment, NicheHunt would connect to:
          </p>
          <ul className="list-disc space-y-1 pl-4 text-slate-300">
            <li>Public forums like Reddit and Quora to mine recurring questions.</li>
            <li>
              Social platforms such as X / Twitter and LinkedIn to track emerging
              trends and sentiment.
            </li>
            <li>Job boards and industry reports to measure demand and pricing.</li>
            <li>
              Large language models (LLMs) to synthesize patterns into structured
              niche ideas, revenue ranges, and playbooks.
            </li>
          </ul>
          <p className="text-xs text-slate-400">
            Any real-world integration would respect platform terms of service,
            robots.txt, and rate limits. We would prioritize transparency, opt-outs,
            and privacy-preserving aggregation.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-50">
            Limitations & responsible use
          </h2>
          <p>
            AI-generated insights can be incomplete, biased, or outdated. Data from
            forums and social platforms over-represents certain demographics and
            industries while under-representing others.
          </p>
          <p className="text-xs text-slate-400">
            NicheHunt is designed for exploration and education. Always validate any
            idea with your own research, financial planning, and, when appropriate,
            professional advice.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200">
          <h2 className="text-base font-semibold text-slate-50">
            Coming soon: community & resources
          </h2>
          <p className="mt-2 text-slate-300">
            We&apos;re exploring future features like curated playbooks, niche alerts,
            and a community space where builders can share what&apos;s working in
            their micro-markets.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {['Finding your first 10 customers', 'Validating a niche in 7 days', 'Avoiding AI hype traps'].map(
              (title) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-200"
                >
                  <p className="font-medium">{title}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Blog teaser · coming soon
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

