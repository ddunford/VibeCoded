# Content Summarizer

![Content Summarizer Screenshot](content-summarizer.png)

## Overview
The Content Summarizer is a web application that extracts and summarizes content from web pages and PDF files. Built with Next.js and powered by Ollama, it provides intelligent summaries with customizable options.

## Features

### 1. URL Processing
- Web page content extraction using Puppeteer
- Automatic metadata extraction (title, author, date)
- Support for various content types (articles, blogs, documentation)
- Error handling for invalid or inaccessible URLs

### 2. PDF Processing
- Drag-and-drop PDF file upload
- Text extraction and processing
- Support for multi-page documents
- File size validation

### 3. Summary Generation
- AI-powered content summarization
- Customizable summary length
- Key points extraction
- Source attribution

### 4. Modern Interface
- Clean, responsive design with Tailwind CSS
- Real-time processing status
- Error handling and user feedback
- Mobile-friendly layout

## Technical Architecture

### Frontend
- Next.js 13
- Tailwind CSS for styling
- React Drop Zone for file handling
- Responsive design components

### Backend
- Express.js server
- Puppeteer for web scraping
- PDF.js for PDF processing
- Ollama integration for AI summarization

## Project Structure
```
02-content-summarizer/
├── client/
│   ├── components/
│   │   ├── FileUpload.js
│   │   ├── UrlInput.js
│   │   ├── Summary.js
│   │   └── ProcessingStatus.js
│   ├── pages/
│   │   └── index.js
│   └── styles/
│       └── globals.css
├── server/
│   ├── routes/
│   │   └── api.js
│   ├── services/
│   │   ├── puppeteer.js
│   │   ├── pdf.js
│   │   └── ollama.js
│   └── server.js
└── docs/
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Ollama server running locally

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Configure environment:
   ```bash
   # In client directory
   cp .env.example .env.local

   # In server directory
   cp .env.example .env
   ```

4. Start the development servers:
   ```bash
   # Start backend (from server directory)
   npm run dev

   # Start frontend (from client directory)
   npm run dev
   ```

### Configuration
Environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `OLLAMA_API_URL`: Ollama API endpoint
- `OLLAMA_MODEL`: Model to use for summarization
- `MAX_FILE_SIZE`: Maximum PDF file size

## Usage

### Processing URLs
1. Enter a valid URL in the input field
2. Click "Summarize"
3. View the generated summary and key points

### Processing PDFs
1. Drag and drop or click to upload a PDF
2. Wait for processing to complete
3. Review the generated summary

## Error Handling
The application handles:
- Invalid URLs
- Inaccessible web pages
- PDF processing errors
- Network connectivity issues
- API timeouts

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License - See LICENSE file for details 