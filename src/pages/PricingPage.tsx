import { useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { usePageTitle } from '@/hooks/usePageTitle'

type BillingPeriod = 'monthly' | 'annual'

export function PricingPage() {
  usePageTitle('Pricing')
  const [billing, setBilling] = useState<BillingPeriod>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>(
    'pro',
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const { user, setPlan } = useAppStore()

  const getPrice = (plan: 'free' | 'pro' | 'enterprise') => {
    if (plan === 'free') return '$0'
    const base = plan === 'pro' ? 19 : 99
    if (billing === 'monthly') return `$${base}/mo`
    const discounted = Math.round(base * 12 * 0.8)
    return `$${discounted}/yr`
  }

  const handleCheckout = (event: React.FormEvent) => {
    event.preventDefault()
    if (!user) return
    if (selectedPlan === 'free') {
      setPlan('free')
      return
    }
    setPlan(selectedPlan)
    setName('')
    setEmail('')
  }

  return (
    <main className="bg-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Choose the plan that matches your ambition.
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Start free, then upgrade when you&apos;re ready for deeper AI reports,
            unlimited hunts, and exportable playbooks.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-300">
          <span className={billing === 'monthly' ? 'font-semibold text-slate-50' : ''}>
            Monthly
          </span>
          <button
            type="button"
            className="relative h-6 w-11 rounded-full bg-slate-800 px-0.5"
            onClick={() =>
              setBilling((current) => (current === 'monthly' ? 'annual' : 'monthly'))
            }
          >
            <span
              className={`block h-5 w-5 rounded-full bg-emerald-500 transition-transform ${
                billing === 'annual' ? 'translate-x-5' : ''
              }`}
            />
          </button>
          <span className={billing === 'annual' ? 'font-semibold text-slate-50' : ''}>
            Annual
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
            Save ~20% with annual billing
          </span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PricingCard
            name="Free"
            description="Experiment with AI-simulated niche hunts."
            price={getPrice('free')}
            features={[
              '3 full hunts per month',
              'Basic niche insights',
              'Limited saved niches',
              'No exports',
            ]}
            highlight={false}
            selected={selectedPlan === 'free'}
            onSelect={() => setSelectedPlan('free')}
          />
          <PricingCard
            name="Pro"
            badge="Most popular"
            description="For builders validating multiple bets per year."
            price={getPrice('pro')}
            features={[
              'Unlimited hunts',
              'Deeper competition breakdowns',
              'PDF-style export summaries (simulated)',
              'Priority AI processing in future backend',
            ]}
            highlight
            selected={selectedPlan === 'pro'}
            onSelect={() => setSelectedPlan('pro')}
          />
          <PricingCard
            name="Enterprise"
            description="For teams and organizations needing custom workflows."
            price={getPrice('enterprise')}
            features={[
              'All Pro features',
              'Team seats and shared libraries',
              'Custom integrations & API access',
              'Dedicated support channel',
            ]}
            highlight={false}
            selected={selectedPlan === 'enterprise'}
            onSelect={() => setSelectedPlan('enterprise')}
          />
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
            <h2 className="text-sm font-semibold text-slate-50">
              Mock checkout (demo only)
            </h2>
            <p className="mt-1 text-slate-400">
              This checkout simulates a Stripe-like experience for demo purposes. No
              real payments are processed and data never leaves your browser.
            </p>
            <form
              onSubmit={handleCheckout}
              className="mt-4 space-y-3"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-200">
                    Name on card
                  </label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 h-8 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-xs text-slate-50 outline-none placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="Demo User"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-200">
                    Email for receipt
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1 h-8 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-xs text-slate-50 outline-none placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-200">
                  Card details
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    className="h-8 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 text-xs text-slate-50 outline-none placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="4242 4242 4242 4242"
                  />
                  <input
                    className="h-8 w-16 rounded-lg border border-slate-700 bg-slate-950 px-2 text-xs text-slate-50 outline-none placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="MM/YY"
                  />
                  <input
                    className="h-8 w-14 rounded-lg border border-slate-700 bg-slate-950 px-2 text-xs text-slate-50 outline-none placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="CVC"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!user}
                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {user
                  ? `Upgrade to ${
                      selectedPlan === 'pro' ? 'Pro' : selectedPlan === 'enterprise' ? 'Enterprise' : 'Free'
                    }`
                  : 'Log in to upgrade'}
              </button>
              <p className="text-[10px] text-slate-500">
                By continuing, you acknowledge that this is a non-functional demo
                checkout. In production, we recommend integrating Stripe or a similar
                PCI-compliant provider.
              </p>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-200">
            <h2 className="text-sm font-semibold text-slate-50">
              What you get with Pro &amp; Enterprise
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-300">
              <li>
                Richer AI-simulated insights, including competition density and
                pricing bands.
              </li>
              <li>
                Exportable PDFs and summaries to share with collaborators or advisors.
              </li>
              <li>
                Priority access to upcoming features like niche alerts and community
                playbooks.
              </li>
              <li>
                Enterprise plans add team workspaces and API access for custom
                workflows.
              </li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  )
}

interface PricingCardProps {
  name: string
  description: string
  price: string
  features: string[]
  badge?: string
  highlight: boolean
  selected: boolean
  onSelect: () => void
}

function PricingCard({
  name,
  description,
  price,
  features,
  badge,
  highlight,
  selected,
  onSelect,
}: PricingCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col rounded-2xl border p-4 text-left ${
        highlight
          ? 'border-emerald-500/60 bg-slate-900 shadow-lg shadow-emerald-500/15'
          : 'border-slate-800 bg-slate-900/70'
      } ${selected ? 'ring-2 ring-emerald-400' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-50">{name}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
        {badge && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-xl font-semibold text-emerald-300">{price}</p>
      <ul className="mt-3 flex-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <span className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-700 px-3 py-1 text-[11px] text-slate-200">
        {selected ? 'Selected' : 'Select plan'}
      </span>
    </button>
  )
}

