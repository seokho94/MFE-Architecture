import React, { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// const UserServiceComponent = React.lazy(
//   () => import('userService/UserServiceComponent')
// );

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
