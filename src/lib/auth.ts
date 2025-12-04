import type { SubscriptionPlan, User } from '@/store/appStore'

const STORAGE_KEY = 'nichehunt-demo-auth'

interface StoredUser {
  id: string
  email: string
  name: string
  plan: SubscriptionPlan
}

interface AuthStoragePayload {
  user: StoredUser | null
}

export function loadStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthStoragePayload
    return parsed.user ?? null
  } catch {
    return null
  }
}

export function persistUser(user: User | null) {
  if (typeof window === 'undefined') return
  const payload: AuthStoragePayload = {
    user: user
      ? {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
        }
      : null,
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}


