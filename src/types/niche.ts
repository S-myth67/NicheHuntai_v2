export type NicheCategory = 'all' | 'jobs' | 'business' | 'side-hustles'

export type NicheCostLevel = 'low' | 'medium' | 'high'

export interface NicheSource {
  id: string
  label: string
  url?: string
  platform?: 'reddit' | 'quora' | 'twitter' | 'linkedin' | 'report' | 'other'
}

export interface NicheIdea {
  id: string
  title: string
  category: NicheCategory
  costLevel: NicheCostLevel
  estimatedRevenueRange: string
  roiTimeline: string
  difficulty: 'low' | 'medium' | 'high'
  summary: string
  insights: string[]
  steps: string[]
  sources: NicheSource[]
}

export interface NicheSearchFilters {
  category: NicheCategory
  costLevel?: NicheCostLevel | 'any'
}

export interface NicheSearchRequest {
  profession: string
  filters: NicheSearchFilters
}

export interface NicheSearchResult {
  requestId: string
  query: NicheSearchRequest
  ideas: NicheIdea[]
  createdAt: string
}


