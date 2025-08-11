import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { ErrorBoundary } from '../pages/error/ErrorBoundary';

const UserServiceComponent = lazy(() => import('userService/UserServiceComponent'));
const AuthServiceComponent = lazy(() => import('authService/AuthServiceComponent'));
const NotiServiceComponent = lazy(() => import('notiService/NotiServiceComponent'));

export const routes: RouteObject[] = [
  {
    path: '/', element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
  ) },
  {
    path: '/users',
    element: (
      <ErrorBoundary fallback={<div>Error loading user service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserServiceComponent />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/authorities',
    element: (
      <ErrorBoundary fallback={<div>Error loading auth service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthServiceComponent />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/notis',
    element: (
      <ErrorBoundary fallback={<div>Error loading notification service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <NotiServiceComponent />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  { path: '*', element: <div>404</div> },
];