/**
 * Error Boundary component for handling React component errors
 * @component
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  /** Content to render when no error occurs */
  children: ReactNode;
  /** Component to render when an error occurs */
  fallback: ReactNode;
}

interface State {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
} 