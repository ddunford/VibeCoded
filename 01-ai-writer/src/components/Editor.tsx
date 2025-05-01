/**
 * A Monaco-based text editor component for content generation
 * @component
 */

import React, { useState } from 'react';
import Chat from './Chat';
import { ErrorBoundary } from '../utils/ErrorBoundary';

interface EditorProps {
  /** Initial content for the editor */
  initialContent?: string;
  /** Callback when content changes */
  onContentChange?: (content: string) => void;
  /** Whether the editor is in read-only mode */
  isReadOnly?: boolean;
}

export function Editor({ 
  initialContent = '', 
  onContentChange,
  isReadOnly = false 
}: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  const handleContentUpdate = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);
  };

  return (
    <ErrorBoundary fallback={<div className="text-red-500">Error loading editor</div>}>
      <div className="flex flex-col h-[calc(100vh-64px)] gap-4 p-4">
        {/* Chat Panel */}
        <div className="w-full">
          <Chat onContentUpdate={handleContentUpdate} />
        </div>
        
        {/* Content Display */}
        <div className="flex-1 overflow-auto bg-gray-800 rounded-lg">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-white p-4 m-0">
              {content || 'Generated content will appear here...'}
            </pre>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Editor; 