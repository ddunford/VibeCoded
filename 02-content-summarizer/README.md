# Content Summarizer

A modern web application that generates concise summaries from URLs and PDF documents using AI.

![Content Summarizer Screenshot](docs/ai-summeriser.png)

## Project Structure

```
02-content-summarizer/
├── frontend/           # React frontend application
├── backend/           # Express backend service
└── docs/             # Documentation and assets
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   npm run install:all
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the values as needed

3. Start development servers:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend
- `PORT`: Server port (default: 3001)
- `OLLAMA_API_URL`: Ollama API URL (default: http://localhost:11434)
- `DEFAULT_MODEL`: Model to use for summarization (default: llama2)
- `MAX_TOKENS`: Maximum tokens for summary (default: 2000)
- `TEMPERATURE`: Model temperature (default: 0.7)

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)

## Features

- URL content extraction
- PDF document processing
- AI-powered content summarization
- Modern React with TypeScript
- Material-UI components
- Docker support for easy deployment 