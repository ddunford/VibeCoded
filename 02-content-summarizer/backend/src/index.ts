import express, { Request, Response } from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3011;

// Ollama configuration
const ollamaConfig = {
  apiUrl: process.env.OLLAMA_API_URL || 'http://localhost:11434',
  defaultModel: process.env.DEFAULT_MODEL || 'llama2',
  maxTokens: parseInt(process.env.MAX_TOKENS || '2000'),
  temperature: parseFloat(process.env.TEMPERATURE || '0.7')
};

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    config: {
      ollama: ollamaConfig,
      environment: process.env.NODE_ENV
    }
  });
});

app.post('/api/extract-content', async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Try to find the main content using common selectors
    const content = await page.evaluate(() => {
      const selectors = [
        'article',
        'main',
        '.article-body',
        '.story-body',
        'body'
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          return element.textContent?.trim() || '';
        }
      }

      return '';
    });

    await browser.close();

    if (!content) {
      return res.status(404).json({ error: 'Could not find main content' });
    }

    res.json({ content });
  } catch (error) {
    console.error('Error extracting content:', error);
    res.status(500).json({ 
      error: 'Failed to extract content',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.post('/api/generate-summary', async (req: Request<{}, {}, { content: string }>, res: Response) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const response = await fetch(`${ollamaConfig.apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ollamaConfig.defaultModel,
        prompt: `Please provide a concise summary of the following text:\n\n${content}`,
        stream: false,
        options: {
          temperature: ollamaConfig.temperature,
          num_predict: ollamaConfig.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ summary: data.response });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
  console.log('Configuration:', {
    ollama: ollamaConfig,
    environment: process.env.NODE_ENV
  });
}); 