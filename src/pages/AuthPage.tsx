import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppStore } from '@/store/appStore'
import { useEffect } from 'react'
import { Target, ArrowRight } from 'lucide-react'

const authSchema = z.object({
  email: z.string().email('Enter a valid email address'),
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
    await new Promise((resolve) => setTimeout(resolve, 500))

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
      email: 'builder@nichehunt.app',
      name: 'Alex Rivera',
      plan: 'pro',
    })
    navigate('/dashboard', { replace: true })
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-900 shadow-lg">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            <Target className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-950">
            Niche<span className="text-black">Hunt</span>
          </span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-zinc-950">
          {mode === 'signup' ? 'Access the Intelligence Database' : 'Welcome back'}
        </h1>
        <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
          {mode === 'signup' 
            ? 'Create an account to search thousands of validated market niches.' 
            : 'Sign in to access your saved dossiers and custom playbooks.'}
        </p>

        <button
          type="button"
          onClick={handleGoogleDemo}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-black transition"
        >
          <span>Continue with Demo Profile (1-Click)</span>
        </button>

        <div className="my-5 flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
          <div className="h-px flex-1 bg-zinc-200" />
          <span>or continue with email</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700">
                Your name
              </label>
              <input
                {...register('name')}
                className="mt-1.5 h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. Sarah Connor"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700">
              Work email
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1.5 h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="mt-1.5 h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-[11px] text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800 shadow-sm"
          >
            {mode === 'signup' ? 'Create Free Account' : 'Sign In'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <Link to="/auth/login" className="text-black hover:underline font-bold">
                Sign in
              </Link>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/auth/signup" className="text-black hover:underline font-bold">
                Create one free
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
