# AI Writer Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Ollama installed and running
- Git

## Installation Steps

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-writer
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
```

4. Start the development server:
```bash
npm run dev
```

## Model Setup

1. Install Ollama:
```bash
curl https://ollama.ai/install.sh | sh
```

2. Pull the required model:
```bash
ollama pull llama3
```

## Configuration Options

### Frontend Configuration
- Editor theme
- Response streaming settings
- UI customization

### Backend Configuration
- Model parameters
- Prompt templates
- Rate limiting

## Troubleshooting

Common issues and solutions:
1. Model not responding
2. Streaming connection issues
3. Performance optimization 