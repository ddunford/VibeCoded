import { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import URLInput from './components/URLInput';
import FileUploader from './components/FileUploader';
import SummaryResults from './components/SummaryResults';
import { SummaryResult } from './types';

function App() {
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [summaryResults, setSummaryResults] = useState<SummaryResult[]>([]);

  const handleURLProcess = async (url: string) => {
    try {
      setProcessingStatus('Processing URL...');
      
      // Extract content from URL
      const response = await fetch('http://localhost:3001/api/extract-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to extract content from URL');
      }

      const { content } = await response.json();
      
      // Generate summary using Ollama
      setProcessingStatus('Generating summary...');
      const summaryResponse = await fetch('http://localhost:3001/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!summaryResponse.ok) {
        throw new Error('Failed to generate summary');
      }

      const { summary } = await summaryResponse.json();

      // Add new summary to results
      const newResult: SummaryResult = {
        id: Date.now().toString(),
        summary,
        source: url,
        timestamp: new Date().toISOString(),
        options: {
          model: 'llama2',
          maxTokens: 2000,
          temperature: 0.7,
        },
      };

      setSummaryResults(prev => [newResult, ...prev]);
      setProcessingStatus('');
    } catch (error) {
      console.error('Error processing URL:', error);
      setProcessingStatus('Failed to process URL. Please try again.');
    }
  };

  const handleFileProcess = async (file: File) => {
    try {
      setProcessingStatus('Processing file...');
      // TODO: Implement file processing logic
      setProcessingStatus('');
    } catch (error) {
      console.error('Error processing file:', error);
      setProcessingStatus('Failed to process file. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Content Summarizer
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <URLInput onURLProcess={handleURLProcess} />
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <FileUploader onFileProcess={handleFileProcess} />
        </Paper>

        {processingStatus && (
          <Typography color="text.secondary" align="center" sx={{ my: 2 }}>
            {processingStatus}
          </Typography>
        )}

        <SummaryResults results={summaryResults} />
      </Box>
    </Container>
  );
}

export default App; 