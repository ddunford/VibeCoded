# Content Summarizer Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Ollama installed and running
- Chrome/Chromium (for Puppeteer)
- Git

## Installation Steps

1. **Clone the Repository**:
```bash
git clone [repository-url]
cd content-summarizer
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
PORT=3011
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=mistral
MAX_FILE_SIZE=10485760  # 10MB in bytes
PUPPETEER_TIMEOUT=30000 # 30 seconds
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

#### File Upload Configuration
```javascript
// File upload options
{
  maxSize: 10485760, // 10MB
  accept: {
    'application/pdf': ['.pdf'],
  },
  maxFiles: 1
}
```

#### URL Processing Options
- Timeout settings
- Retry attempts
- Progress tracking

### Backend Settings

#### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3011 |
| OLLAMA_API_URL | Ollama API endpoint | http://localhost:11434 |
| OLLAMA_MODEL | Model name | mistral |
| MAX_FILE_SIZE | Maximum file size | 10MB |
| PUPPETEER_TIMEOUT | Scraping timeout | 30000 |

#### Processing Options
- Summary length control
- Extraction settings
- Rate limiting

## Troubleshooting

### Common Issues

1. **Puppeteer Installation**
   ```
   Error: Could not find Chrome
   ```
   - Install Chrome/Chromium
   - Set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   - Use custom Chrome path

2. **PDF Processing**
   ```
   Error: File too large
   ```
   - Check MAX_FILE_SIZE setting
   - Verify file size
   - Optimize PDF before upload

3. **URL Processing**
   ```
   Error: TIMEOUT
   ```
   - Increase PUPPETEER_TIMEOUT
   - Check website accessibility
   - Verify network connection

### Verification Steps
1. Check Ollama status: `ollama list`
2. Test URL processing: `curl http://localhost:3001/api/health`
3. Verify PDF handling: Upload test PDF
4. Monitor server logs 