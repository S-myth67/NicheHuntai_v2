import { create } from 'zustand'
import type { NicheIdea } from '@/types/niche'
import { loadStoredUser, persistUser } from '@/lib/auth'

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise'

export interface User {
  id: string
  email: string
  name: string
  plan: SubscriptionPlan
}

export interface SearchHistoryItem {
  id: string
  profession: string
  createdAt: string
  resultCount: number
}

interface AppState {
  user: User | null
  searchHistory: SearchHistoryItem[]
  savedNiches: NicheIdea[]
  setUser: (user: User | null) => void
  setPlan: (plan: SubscriptionPlan) => void
  addSearchHistory: (item: SearchHistoryItem) => void
  saveNiche: (niche: NicheIdea) => void
  removeSavedNiche: (id: string) => void
}

export const useAppStore = create<AppState>((set) => {
  const storedUser = loadStoredUser()

  return {
    user: storedUser,
    searchHistory: [],
    savedNiches: [],
    setUser: (user) => {
      persistUser(user)
      set({ user })
    },
    setPlan: (plan) =>
      set((state) => {
        if (!state.user) return state
        const updatedUser = { ...state.user, plan }
        persistUser(updatedUser)
        return { user: updatedUser }
      }),
    addSearchHistory: (item) =>
      set((state) => ({
        searchHistory: [item, ...state.searchHistory],
      })),
    saveNiche: (niche) =>
      set((state) => {
        if (state.savedNiches.some((n) => n.id === niche.id)) return state
        return { savedNiches: [...state.savedNiches, niche] }
      }),
    removeSavedNiche: (id) =>
      set((state) => ({
        savedNiches: state.savedNiches.filter((n) => n.id !== id),
      })),
  }
})

