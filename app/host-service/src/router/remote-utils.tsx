import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from '../pages/error/ErrorBoundary';

type RemoteBoundaryProps = {
  id: string;                      // remote 식별자
  fallback: React.ReactNode;
  children: React.ReactNode;
};

// 라우트 이동마다 location.key가 바뀌므로 Boundary가 리마운트되어 에러 상태가 초기화됩니다.
export function RemoteBoundary({ id, fallback, children }: RemoteBoundaryProps) {
  const location = useLocation();
  return (
    <ErrorBoundary key={`${id}-${location.key}`} fallback={fallback}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
}

// 최초 로드 실패 Promise가 캐시되어 이후에도 계속 실패하는 것을 방지
export function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  retries = 2,
) {
  return lazy(async () => {
    let lastErr: unknown;
    for (let i = 0; i <= retries; i += 1) {
      try {
        return await importer();
      } catch (e) {
        lastErr = e;
        // 짧은 지수 백오프
        await new Promise((r) => setTimeout(r, 300 * (i + 1)));
      }
    }
    throw lastErr;
  });
}