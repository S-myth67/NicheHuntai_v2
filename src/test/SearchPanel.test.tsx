import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchPanel } from '@/components/dashboard/SearchPanel'
import * as mockSearch from '@/lib/mockSearch'
import { useAppStore } from '@/store/appStore'

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient()
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('SearchPanel', () => {
  it('disables Hunt now button when profession is empty', () => {
    renderWithClient(<SearchPanel />)
    const button = screen.getByRole('button', { name: /hunt now/i })
    expect(button).toBeDisabled()
  })

  it('runs mock search when form is submitted with a profession', async () => {
    const spy = vi.spyOn(mockSearch, 'runMockNicheSearch').mockResolvedValue({
      requestId: 'test',
      query: {
        profession: 'designer',
        filters: { category: 'all', costLevel: 'any' },
      },
      ideas: [],
      createdAt: new Date().toISOString(),
    })

    useAppStore.setState({
      user: { id: '1', email: 'test@example.com', name: 'Test', plan: 'free' },
      searchHistory: [],
      savedNiches: [],
    } as any)

    renderWithClient(<SearchPanel />)

    const input = screen.getByPlaceholderText(/fitness trainer for parents/i)
    fireEvent.change(input, { target: { value: 'designer' } })

    const button = screen.getByRole('button', { name: /hunt now/i })
    expect(button).toBeEnabled()

    fireEvent.click(button)

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})


