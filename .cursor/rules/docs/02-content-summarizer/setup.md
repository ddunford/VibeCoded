# Content Summarizer Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Ollama installed and running
- Chrome/Chromium (for Puppeteer)
- Git

## Installation Steps

1. Clone the repository:
```bash
git clone [repository-url]
cd content-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
OLLAMA_API_URL=http://localhost:11434
MODEL_NAME=llama3
MAX_FILE_SIZE=10485760
```

4. Start the development server:
```bash
npm run dev
```

## Component Setup

### Puppeteer Setup
```bash
npm install puppeteer
```

### PDF.js Setup
```bash
npm install pdfjs-dist
```

### Ollama Setup
```bash
curl https://ollama.ai/install.sh | sh
ollama pull llama3
```

## Configuration Options

### Frontend Configuration
- File upload limits
- UI customization
- Progress indicators

### Backend Configuration
- Chunk size settings
- Timeout values
- Rate limiting

## Troubleshooting

Common issues and solutions:
1. PDF parsing errors
2. Web scraping issues
3. Memory management
4. Performance optimization 