import React from 'react';

type Props = { fallback: React.ReactNode; onError?: (error: unknown) => void; children?: React.ReactNode };
type State = { hasError: boolean; error?: unknown };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: unknown) { return { hasError: true, error }; }
  componentDidCatch(error: unknown) { this.props.onError?.(error); }
  reset = () => this.setState({ hasError: false, error: undefined });
  render() {
    if (this.state.hasError) return <>{this.props.fallback}</>;
    return this.props.children;
  }
}