import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const UserServiceComponent = React.lazy(
  () => import('userService/UserServiceComponent')
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <UserServiceComponent />
    </Suspense>
  </StrictMode>,
)
