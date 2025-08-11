import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { RemoteBoundary, lazyWithRetry } from './remote-utils';

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
      <RemoteBoundary id="userService" fallback={<div>Error loading user service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserServiceComponent />
        </Suspense>
      </RemoteBoundary>
    ),
  },
  {
    path: '/authorities',
    element: (
      <RemoteBoundary id="authService" fallback={<div>Error loading auth service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthServiceComponent />
        </Suspense>
      </RemoteBoundary>
    ),
  },
  {
    path: '/notis',
    element: (
      <RemoteBoundary id="notiService" fallback={<div>Error loading notification service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <NotiServiceComponent />
        </Suspense>
      </RemoteBoundary>
    ),
  },
  { path: '*', element: <div>404</div> },
];
