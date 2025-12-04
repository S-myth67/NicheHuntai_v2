import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { RootLayout } from '@/layouts/RootLayout'
import { AppRouter } from '@/router/AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout>
        <AppRouter />
      </RootLayout>
    </BrowserRouter>
  </StrictMode>,
)

