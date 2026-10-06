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
    <main className="bg-white text-zinc-900 min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-black font-bold">
            Transparent Pricing
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
            Choose the plan that matches your ambition.
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            Start exploring free, then upgrade when you&apos;re ready for full market signals,
            unlimited niche dossier exports, and competitor analysis.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-zinc-700">
          <span className={billing === 'monthly' ? 'font-bold text-black' : ''}>
            Monthly
          </span>
          <button
            type="button"
            className="relative h-6 w-11 rounded-full bg-zinc-200 px-0.5 border border-zinc-300"
            onClick={() =>
              setBilling((current) => (current === 'monthly' ? 'annual' : 'monthly'))
            }
          >
            <span
              className={`block h-5 w-5 rounded-full bg-black transition-transform ${
                billing === 'annual' ? 'translate-x-5' : ''
              }`}
            />
          </button>
          <span className={billing === 'annual' ? 'font-bold text-black' : ''}>
            Annual
          </span>
          <span className="rounded-full bg-zinc-100 border border-zinc-300 px-2 py-0.5 text-[11px] text-zinc-900 font-mono font-semibold">
            Save ~20% with annual billing
          </span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PricingCard
            name="Starter Explorer"
            description="Explore basic niche dossiers and live signals."
            price={getPrice('free')}
            features={[
              '10 full niche hunts per month',
              'Basic market demand scores',
              'Community signal highlights',
              'Personal dashboard bookmarks',
            ]}
            highlight={false}
            selected={selectedPlan === 'free'}
            onSelect={() => setSelectedPlan('free')}
          />
          <PricingCard
            name="Pro Intelligence"
            badge="Most popular"
            description="For active builders validating high-margin bets."
            price={getPrice('pro')}
            features={[
              'Unlimited whitespace hunts',
              'Deep buyer quotes & thread citations',
              'Complete 4-step go-to-market playbooks',
              'Full JSON & PDF blueprint export',
              'Early alerts on surging community signals',
            ]}
            highlight
            selected={selectedPlan === 'pro'}
            onSelect={() => setSelectedPlan('pro')}
          />
          <PricingCard
            name="Studio / Enterprise"
            description="For agencies and product studios scaling offer discovery."
            price={getPrice('enterprise')}
            features={[
              'All Pro intelligence features',
              'Up to 5 team workspace seats',
              'Custom webhook & API export feeds',
              'Dedicated account research strategist',
            ]}
            highlight={false}
            selected={selectedPlan === 'enterprise'}
            onSelect={() => setSelectedPlan('enterprise')}
          />
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-xs text-zinc-800 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950">
              Instant Activation Checkout
            </h2>
            <p className="mt-1 text-zinc-500">
              Select your plan above and confirm your details. Data stays encrypted and secure.
            </p>
            <form
              onSubmit={handleCheckout}
              className="mt-4 space-y-3"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700">
                    Name on card
                  </label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 h-8 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Demo User"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700">
                    Email for receipt
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1 h-8 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700">
                  Card details
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    className="h-8 flex-1 rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="4242 4242 4242 4242"
                  />
                  <input
                    className="h-8 w-16 rounded-lg border border-zinc-300 bg-white px-2 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="MM/YY"
                  />
                  <input
                    className="h-8 w-14 rounded-lg border border-zinc-300 bg-white px-2 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="CVC"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!user}
                className="inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {user
                  ? `Activate ${
                      selectedPlan === 'pro' ? 'Pro' : selectedPlan === 'enterprise' ? 'Enterprise' : 'Free'
                    } Access`
                  : 'Log in to subscribe'}
              </button>
              <p className="text-[10px] text-zinc-500">
                Encrypted with 256-bit SSL · Cancel anytime in your account settings with 1 click.
              </p>
            </form>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-xs text-zinc-800 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950">
              Why builders choose NicheHunt Pro
            </h2>
            <ul className="mt-3 space-y-2.5 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Direct citations to real buyer complaints on Reddit and Hacker News.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Calculated pricing benchmarks and competitive density ratings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Step-by-step cold outreach scripts and offer frameworks for fast validation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Exportable playbooks in Markdown and JSON formats.</span>
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
      className={`flex flex-col rounded-2xl border p-5 text-left transition-all ${
        highlight
          ? 'border-black bg-zinc-950 text-white shadow-md'
          : 'border-zinc-200 bg-white hover:border-zinc-400 text-zinc-900 shadow-sm'
      } ${selected && !highlight ? 'ring-2 ring-black' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className={`mt-1 text-xs leading-relaxed ${highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {description}
          </p>
        </div>
        {badge && (
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wide ${
            highlight ? 'bg-white text-black' : 'bg-zinc-100 text-zinc-900 border border-zinc-300'
          }`}>
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-mono font-bold">{price}</p>
      <ul className={`mt-4 flex-1 space-y-2 text-[11px] border-t pt-3 ${
        highlight ? 'border-zinc-800 text-zinc-300' : 'border-zinc-100 text-zinc-600'
      }`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5">
            <span className="font-bold text-xs">·</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <span className={`mt-5 inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-bold transition ${
        highlight
          ? 'bg-white text-black hover:bg-zinc-100'
          : selected
          ? 'bg-black text-white'
          : 'border border-zinc-300 text-zinc-900 hover:bg-zinc-100'
      }`}>
        {selected ? 'Selected Plan' : 'Choose Plan'}
      </span>
    </button>
  )
}
