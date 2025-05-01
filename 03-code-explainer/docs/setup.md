# Code Explainer Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Ollama installed and running
- Git
- npm or yarn

## Installation Steps

1. **Clone the repository**:
```bash
git clone [repository-url]
cd code-explainer
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
PORT=3001
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=codellama
```

4. **Install and Configure Ollama**:

Install Ollama:
```bash
curl https://ollama.ai/install.sh | sh
```

Pull the CodeLLaMA model:
```bash
ollama pull codellama
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
  language: 'javascript',
  automaticLayout: true,
  minimap: { enabled: false }
}
```

#### Available Languages
- JavaScript/TypeScript
- Python
- Java
- C++
- Ruby
- Go

### Backend Settings

#### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| OLLAMA_API_URL | Ollama API endpoint | http://localhost:11434 |
| OLLAMA_MODEL | Model name | codellama |

#### Analysis Options
- Explanation depth: basic/detailed/comprehensive
- Documentation styles: standard/jsdoc/google/pydoc/javadoc
- Code review focus: best practices/improvements/security

## Troubleshooting

### Common Issues

1. **Ollama Connection Error**
   ```
   Error: Could not connect to Ollama service
   ```
   - Ensure Ollama is running: `ollama serve`
   - Check OLLAMA_API_URL in .env
   - Verify network connectivity

2. **Model Loading Issues**
   ```
   Error: Model not found: codellama
   ```
   - Run: `ollama pull codellama`
   - Check model name in .env
   - Verify Ollama installation

3. **Port Conflicts**
   ```
   Error: Port 3000 is already in use
   ```
   - Change port in .env
   - Kill existing process
   - Use different port for development

### Verification Steps
1. Check Ollama status: `ollama list`
2. Verify API connectivity: `curl http://localhost:11434/api/tags`
3. Test frontend build: `npm run build`
4. Validate environment variables 