import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Editor } from '../Editor';

describe('Editor Component', () => {
  it('renders with initial content', () => {
    render(<Editor initialContent="Test content" />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows placeholder when no content', () => {
    render(<Editor />);
    expect(screen.getByText('Generated content will appear here...')).toBeInTheDocument();
  });

  it('calls onContentChange when content updates', () => {
    const handleChange = vi.fn();
    render(<Editor onContentChange={handleChange} />);
    
    // Simulate content update from Chat component
    const newContent = 'New content';
    fireEvent.change(screen.getByRole('textbox'), { target: { value: newContent } });
    
    expect(handleChange).toHaveBeenCalledWith(newContent);
  });

  it('shows loading state', () => {
    render(<Editor />);
    // TODO: Add test for loading state once we implement the loading trigger
  });

  it('shows error boundary fallback on error', () => {
    // Mock console.error to prevent error logging during test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Create a wrapper component that uses Editor and throws an error
    const ErrorWrapper = () => {
      return (
        <Editor
          onContentChange={() => {
            throw new Error('Test error');
          }}
          initialContent="Test"
        />
      );
    };

    render(<ErrorWrapper />);
    
    // Trigger the error by simulating a content change
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new content' } });

    expect(screen.getByText('Error loading editor')).toBeInTheDocument();
    
    // Restore console.error
    consoleError.mockRestore();
  });
}); 