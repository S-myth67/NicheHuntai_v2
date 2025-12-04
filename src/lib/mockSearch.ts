import type {
  NicheIdea,
  NicheSearchRequest,
  NicheSearchResult,
} from '@/types/niche'

function baseIdeas(profession: string): NicheIdea[] {
  const prof = profession || 'your profession'

  return [
    {
      id: 'idea-1',
      title: `Premium ${prof} advisory for remote-first companies`,
      category: 'business',
      costLevel: 'medium',
      estimatedRevenueRange: '$3k–$7k / month',
      roiTimeline: '3–6 months',
      difficulty: 'medium',
      summary:
        'Productize your expertise into async strategy sessions and retainers for distributed teams.',
      insights: [
        'Growing number of remote-first companies report gaps in specialized advice on Reddit and LinkedIn.',
        'Leaders are willing to pay for fast, async guidance that fits across time zones.',
        'Narrow focus (industry, company size) improves positioning and pricing power.',
      ],
      steps: [
        'Interview 5–10 people in your target market to validate biggest pains.',
        'Design 2–3 clear advisory packages with transparent scope and outcomes.',
        'Publish a focused landing page and share it in niche communities (Slack groups, LinkedIn).',
      ],
      sources: [
        {
          id: 'src-1',
          label: 'r/Entrepreneur threads on expert advisory offers',
          platform: 'reddit',
        },
        {
          id: 'src-2',
          label: 'LinkedIn posts on async consulting trends',
          platform: 'linkedin',
        },
      ],
    },
    {
      id: 'idea-2',
      title: `Cohort-based bootcamp for aspiring ${prof}s`,
      category: 'jobs',
      costLevel: 'low',
      estimatedRevenueRange: '$1k–$4k / cohort',
      roiTimeline: '1–3 months',
      difficulty: 'low',
      summary:
        'Host small-group, outcome-focused live sessions teaching the most in-demand skills people ask about online.',
      insights: [
        'High volume of “how do I break into this field?” questions on Reddit and Quora.',
        'Learners increasingly prefer guided cohorts over self-paced courses.',
        'Repeatable curriculum lets you iterate towards better outcomes and testimonials.',
      ],
      steps: [
        'Compile the top recurring questions beginners ask about your field.',
        'Design a 3–4 week live curriculum with clear weekly deliverables.',
        'Pilot the first cohort at a discounted rate with 5–10 students for testimonials.',
      ],
      sources: [
        {
          id: 'src-3',
          label: 'Quora questions about getting started in the field',
          platform: 'quora',
        },
        {
          id: 'src-4',
          label: 'X / Twitter threads on cohort-based education trends',
          platform: 'twitter',
        },
      ],
    },
    {
      id: 'idea-3',
      title: `Done-with-you systems setup for solo ${prof}s`,
      category: 'side-hustles',
      costLevel: 'low',
      estimatedRevenueRange: '$500–$2k / client',
      roiTimeline: '1–2 months',
      difficulty: 'low',
      summary:
        'Help other professionals set up tools, automations, and workflows you already mastered in your own practice.',
      insights: [
        'Social posts reveal many solo operators feel overwhelmed by tools and admin.',
        'People pay more for implementation than generic “tips.”',
        'Documented SOPs become assets you can later turn into templates or a course.',
      ],
      steps: [
        'List the top 3–5 tools you rely on daily and what they accomplish for you.',
        'Offer a limited number of implementation slots with clear before/after outcomes.',
        'Record each engagement to turn into reusable checklists and templates.',
      ],
      sources: [
        {
          id: 'src-5',
          label: 'Instagram / LinkedIn posts about burnout from admin work',
          platform: 'linkedin',
        },
        {
          id: 'src-6',
          label: 'Industry reports on rise of solo professionals',
          platform: 'report',
        },
      ],
    },
  ]
}

export async function runMockNicheSearch(
  request: NicheSearchRequest,
): Promise<NicheSearchResult> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const ideas = baseIdeas(request.profession).filter((idea) => {
    if (request.filters.category !== 'all' && idea.category !== request.filters.category) {
      return false
    }
    if (
      request.filters.costLevel &&
      request.filters.costLevel !== 'any' &&
      idea.costLevel !== request.filters.costLevel
    ) {
      return false
    }
    return true
  })

  return {
    requestId: crypto.randomUUID(),
    query: request,
    ideas,
    createdAt: new Date().toISOString(),
  }
}


