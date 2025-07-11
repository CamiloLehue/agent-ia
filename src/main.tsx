import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutTemplate from './layouts/LayoutTemplate.tsx'
import ExamplesPage from './features/examples/ExamplesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutTemplate />} >
          <Route index element={<App />} />
          <Route path="/examples" element={<ExamplesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
