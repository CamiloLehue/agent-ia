import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutTemplate from './layouts/LayoutTemplate.tsx'
import ExamplesPage from './features/examples/ExamplesPage.tsx'
import ProtectedRoute from './features/auth/components/login/ProtectedRoute.tsx'
import Login from './features/auth/components/login/Login.tsx'
import Document from './features/documents/Document.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/documentacion' element={<Document />} />
        <Route index element={<Login />} />
        <Route path='/auth' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutTemplate />} >
            <Route path='/app' element={<App />} />
            <Route path="/examples" element={<ExamplesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
