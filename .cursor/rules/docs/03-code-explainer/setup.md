# Code Explainer Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Ollama installed and running
- Git

## Installation Steps

1. Clone the repository:
```bash
git clone [repository-url]
cd code-explainer
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
MODEL_NAME=codellama
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

2. Pull the CodeLLaMA model:
```bash
ollama pull codellama
```

## Configuration Options

### Frontend Configuration
- Editor theme
- Syntax highlighting
- UI customization

### Backend Configuration
- Model parameters
- Language support
- Documentation templates

## Troubleshooting

Common issues and solutions:
1. Model loading errors
2. Syntax highlighting issues
3. Performance optimization
4. Memory management 