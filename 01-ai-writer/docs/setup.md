# AI Writer Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Ollama installed and running
- Git

## Installation Steps

1. **Clone the Repository**:
```bash
git clone [repository-url]
cd ai-writer
```

2. **Install Dependencies**:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Configure Environment Variables**:

For the client:
```bash
# In the client directory
cp .env.example .env.local
```
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For the server:
```bash
# In the server directory
cp .env.example .env
```
```env
PORT=3010
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=mistral
```

4. **Install and Configure Ollama**:

Install Ollama:
```bash
curl https://ollama.ai/install.sh | sh
```

Pull the required model:
```bash
ollama pull mistral
```

5. **Start the Development Servers**:

Start the backend server:
```bash
# From the server directory
npm run dev
```

Start the frontend application:
```bash
# From the client directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Configuration Options

### Frontend Settings

#### Editor Configuration
```javascript
// Monaco Editor options
{
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'on',
  minimap: { enabled: false }
}
```

#### Writing Styles
- Professional
- Casual
- Technical
- Creative

### Backend Settings

#### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3010 |
| OLLAMA_API_URL | Ollama API endpoint | http://localhost:11434 |
| OLLAMA_MODEL | Model name | mistral |

#### Generation Options
- Temperature control
- Response length
- Style parameters

## Troubleshooting

### Common Issues

1. **Ollama Connection**
   ```
   Error: Could not connect to Ollama service
   ```
   - Ensure Ollama is running: `ollama serve`
   - Check OLLAMA_API_URL in .env
   - Verify network connectivity

2. **Model Loading**
   ```
   Error: Model not found: mistral
   ```
   - Run: `ollama pull mistral`
   - Check model name in .env
   - Verify Ollama installation

3. **Server Connection**
   ```
   Error: Could not connect to server
   ```
   - Check port availability
   - Verify API URL configuration
   - Check network settings

### Verification Steps
1. Check Ollama status: `ollama list`
2. Test API connection: `curl http://localhost:3001/api/health`
3. Verify frontend build: `npm run build`
4. Monitor server logs 