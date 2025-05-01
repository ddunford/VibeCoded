const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Print environment variables (excluding sensitive values)
console.log('Environment: ');
console.log('PORT:', process.env.PORT);
console.log('OLLAMA_API_URL exists:', !!process.env.OLLAMA_API_URL);
console.log('MODEL_NAME:', process.env.MODEL_NAME);

const app = express();
const PORT = process.env.PORT || 3012;
const OLLAMA_API_URL = process.env.OLLAMA_API_URL;
const MODEL_NAME = process.env.MODEL_NAME;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Endpoint for code explanation
app.post('/api/explain', async (req, res) => {
  console.log('Received explain request:', req.body);
  try {
    const { code, language, depth } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const prompt = `Explain the following ${language || ''} code${depth ? ' in ' + depth + ' detail' : ''}:\n\n${code}`;
    
    console.log('Sending request to Ollama API...');
    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: MODEL_NAME,
      prompt,
      stream: false
    });
    console.log('Received response from Ollama API');

    res.json({ explanation: response.data.response });
  } catch (error) {
    console.error('Error explaining code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    res.status(500).json({ error: 'Failed to explain code' });
  }
});

// Endpoint for documentation generation
app.post('/api/generate-docs', async (req, res) => {
  console.log('Received generate-docs request');
  try {
    const { code, language, style } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const prompt = `Generate ${style || 'standard'} documentation for the following ${language || ''} code:\n\n${code}`;
    
    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: MODEL_NAME,
      prompt,
      stream: false
    });

    res.json({ documentation: response.data.response });
  } catch (error) {
    console.error('Error generating documentation:', error.message);
    res.status(500).json({ error: 'Failed to generate documentation' });
  }
});

// Endpoint for code review
app.post('/api/review', async (req, res) => {
  console.log('Received review request');
  try {
    const { code, language } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const prompt = `Review the following ${language || ''} code and provide feedback on best practices, potential bugs, and optimizations:\n\n${code}`;
    
    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: MODEL_NAME,
      prompt,
      stream: false
    });

    res.json({ review: response.data.response });
  } catch (error) {
    console.error('Error reviewing code:', error.message);
    res.status(500).json({ error: 'Failed to review code' });
  }
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

try {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    
    const serverInfo = server.address();
    if (serverInfo) {
      console.log(`Server address: ${serverInfo.address}:${serverInfo.port}`);
    }
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error.message);
  });
} catch (error) {
  console.error('Failed to start server:', error.message);
} 