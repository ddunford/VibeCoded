# Content Summarizer Architecture

## Overview
A versatile tool that generates summaries from URLs and PDF documents, providing quick insights into lengthy content.

## System Components
- Frontend: Web interface with file drop functionality
- Backend: 
  - Ollama for text processing
  - Puppeteer for web scraping
  - PDF.js for document parsing
- Key Features:
  - Multi-format support (URLs, PDFs)
  - Chunked context management
  - Intelligent text extraction

## Technical Stack
1. Frontend:
   - React
   - File upload component
   - Progress indicators
   - Summary display

2. Backend:
   - Node.js
   - Puppeteer
   - PDF.js
   - Ollama API
   - Text chunking service

## Data Flow
1. Input Processing:
   - URL validation
   - PDF parsing
   - Text extraction

2. Content Processing:
   - Text chunking
   - Context management
   - Summary generation

3. Output Delivery:
   - Summary formatting
   - Progress updates
   - Error handling

## Security Considerations
- URL validation
- File size limits
- Content sanitization
- Rate limiting
- Error handling 