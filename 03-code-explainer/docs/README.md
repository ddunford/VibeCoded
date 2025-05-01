# Code Explainer

![Code Explainer Screenshot](code-explainer.png)

A specialized tool for code analysis and documentation generation, powered by CodeLLaMA.

## Features

- **Code Explanation**: Get detailed explanations of code snippets with customizable depth levels
  - Basic: Key points only
  - Detailed: With examples
  - Comprehensive: In-depth analysis
- **Documentation Generation**: Generate formatted documentation in various styles
  - Standard
  - JSDoc
  - Google Style
  - PyDoc
  - JavaDoc
- **Code Review**: Receive feedback on best practices and potential improvements
- **Multi-language Support**: Works with JavaScript, Python, Java, and more
- **Real-time Editor**: Monaco-based code editor with syntax highlighting
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- Ollama installed and running
- CodeLLaMA model downloaded via Ollama

## Setup

1. **Clone the repository**

```bash
git clone [repository-url]
cd code-explainer
```

2. **Install dependencies**

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Configure environment variables**

```bash
# In the client directory
cp .env.example .env.local

# In the server directory
cp .env.example .env
```

Edit the environment files with your Ollama API URL and model name if different from the defaults.

4. **Install Ollama**

If you don't have Ollama installed:

```bash
curl https://ollama.ai/install.sh | sh
```

5. **Pull the CodeLLaMA model**

```bash
ollama pull codellama
```

## Usage

Start the development servers:

```bash
# Start the backend server (from server directory)
npm run dev

# Start the frontend application (from client directory)
npm run dev
```

Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Analysis Types

1. **Code Explanation**
   - Select depth level (Basic/Detailed/Comprehensive)
   - Paste or type your code
   - Click "Process Code"

2. **Documentation Generation**
   - Choose documentation style
   - Input your code
   - Get formatted documentation

3. **Code Review**
   - Submit code for review
   - Receive feedback on:
     - Best practices
     - Potential improvements
     - Code quality

## Development

### Tech Stack
- **Frontend**: 
  - Next.js 13
  - Tailwind CSS
  - Monaco Editor
  - React
- **Backend**: 
  - Node.js with Express
  - CodeLLaMA via Ollama
  - Streaming response support

### Project Structure
```
code-explainer/
├── client/
│   ├── components/
│   │   ├── CodeEditor.js
│   │   ├── Header.js
│   │   ├── SettingsControls.js
│   │   └── ResultDisplay.js
│   ├── pages/
│   │   └── index.js
│   └── styles/
│       └── globals.css
├── server/
│   ├── routes/
│   │   └── api.js
│   └── server.js
└── docs/
```

## License

ISC 