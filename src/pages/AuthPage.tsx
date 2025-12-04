import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppStore } from '@/store/appStore'
import { useEffect } from 'react'

const authSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
})

type AuthFormValues = z.infer<typeof authSchema>

export function AuthPage() {
  const navigate = useNavigate()
  const params = useParams()
  const mode = params.mode === 'signup' ? 'signup' : 'login'

  const { user, setUser } = useAppStore()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (values: AuthFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const name =
      mode === 'signup'
        ? values.name?.trim() || values.email.split('@')[0]
        : values.email.split('@')[0]

    setUser({
      id: crypto.randomUUID(),
      email: values.email.toLowerCase(),
      name,
      plan: 'free',
    })

    navigate('/dashboard', { replace: true })
  }

  const handleGoogleDemo = () => {
    setUser({
      id: 'demo-google',
      email: 'demo@nichehunt.app',
      name: 'Demo User',
      plan: 'pro',
    })
    navigate('/dashboard', { replace: true })
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-slate-50 shadow-xl shadow-emerald-500/10">
        <h1 className="text-xl font-semibold tracking-tight">
          {mode === 'signup' ? 'Create your NicheHunt account' : 'Welcome back'}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          This is a demo authentication flow. Accounts are stored locally in your
          browser for preview purposes only.
        </p>

        <button
          type="button"
          onClick={handleGoogleDemo}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900"
        >
          <span className="text-lg">G</span>
          Continue with Google (demo)
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
          <div className="h-px flex-1 bg-slate-800" />
          <span>or with email</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-200">
                Name
              </label>
              <input
                type="text"
                autoComplete="name"
                {...register('name')}
                className="mt-1 h-9 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              {...register('email')}
              className="mt-1 h-9 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              {...register('password')}
              className="mt-1 h-9 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {mode === 'signup' ? 'Create account' : 'Continue'}
          </button>
        </form>

        <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
          NicheHunt uses simulated authentication and AI results in this demo.
          Do not enter sensitive or real production credentials. In a real
          deployment, use a provider like Firebase Auth or Auth0 with secure
          password hashing and multi-factor authentication.
        </p>
      </section>
    </main>
  )
}

