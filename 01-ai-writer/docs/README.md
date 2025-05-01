# AI Writer Documentation

## Overview
AI Writer is a powerful writing assistant that leverages Ollama's LLaMA 3 / Mistral models to help users generate various types of content. The application provides a modern, user-friendly interface with real-time text generation and role-based content creation.

## Features
- Real-time text generation with streaming responses
- Role-based content creation (CTO, Marketing, Technical Writer)
- Markdown editor with syntax highlighting
- Dark mode interface
- Responsive design

## Technical Architecture

### Frontend
- React with TypeScript
- Material-UI for components
- Monaco Editor for text editing
- Axios for API communication

### Backend Integration
- Ollama API integration
- Streaming response handling
- Role-based prompt management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Ollama installed and running
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ai-writer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage Guide

### Basic Usage
1. Select a writing role from the dropdown
2. Enter your initial prompt or context
3. Click "Generate Content"
4. Edit the generated content as needed

### Role-Based Writing
- **CTO**: Technical and strategic content
- **Marketing**: Marketing copy and promotional content
- **Technical Writer**: Documentation and technical content
- **Custom**: User-defined writing style

### Advanced Features
- Real-time content generation
- Markdown support
- Content streaming
- Custom prompt templates

## API Reference

### Endpoints

#### Generate Content
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "string",
  "role": "string",
  "model": "string"
}
```

Response: Streaming text content

### Configuration

#### Environment Variables
- `OLLAMA_API_URL`: Ollama API endpoint
- `MODEL_NAME`: Default model to use

## Development

### Project Structure
```
ai-writer/
├── src/
│   ├── components/
│   │   ├── Editor.tsx
│   │   └── Navbar.tsx
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── public/
├── docs/
└── [config files]
```

### Adding New Features
1. Create new components in `src/components`
2. Add routes in `App.tsx`
3. Update documentation
4. Test thoroughly

## Troubleshooting

### Common Issues
1. **Model Not Responding**
   - Check Ollama service status
   - Verify API endpoint configuration
   - Check network connectivity

2. **Streaming Issues**
   - Verify browser compatibility
   - Check network stability
   - Monitor memory usage

3. **Editor Problems**
   - Clear browser cache
   - Check for conflicting extensions
   - Verify Monaco Editor configuration

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License - See LICENSE file for details 