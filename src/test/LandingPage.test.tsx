import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'

describe('LandingPage', () => {
  it('renders hero headline and demo input', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    )

    expect(
      screen.getByText(/unlock profitable niches in any profession/i),
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/fitness trainer, software developer/i),
    ).toBeInTheDocument()
  })
})


