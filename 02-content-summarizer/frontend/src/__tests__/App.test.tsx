import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the router
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows error boundary fallback on error', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
      return null;
    };

    render(
      <App>
        <ErrorComponent />
      </App>
    );

    expect(screen.getByText('Error loading application')).toBeInTheDocument();
  });
}); 