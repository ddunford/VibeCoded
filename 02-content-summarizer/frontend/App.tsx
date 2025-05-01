import React, { useState } from 'react';
import { Container, Box, Typography, Alert } from '@mui/material';
import FileUploader from './components/FileUploader';
import URLInput from './components/URLInput';
import SummaryOptions from './components/SummaryOptions';
import SummaryDisplay from './components/SummaryDisplay';
import { SummaryOptions as SummaryOptionsType, SummaryResult, ProcessingStatus } from './types';
import { config } from './config';
import { URLService } from './services/url';
import { OllamaService } from './services/ollama';

const App: React.FC = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    progress: 0,
    message: '',
  });

  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null);
  const [summaryOptions, setSummaryOptions] = useState<SummaryOptionsType>(config.defaultSummaryOptions);

  const handleFileProcess = async (file: File) => {
    try {
      setProcessingStatus({
        isProcessing: true,
        progress: 0,
        message: 'Processing file...',
      });

      // TODO: Implement file processing logic
      // This will be implemented when we create the file processing service

      setProcessingStatus({
        isProcessing: false,
        progress: 100,
        message: 'File processed successfully',
      });
    } catch (error) {
      setProcessingStatus({
        isProcessing: false,
        progress: 0,
        message: `Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const handleURLProcess = async (url: string) => {
    try {
      setProcessingStatus({
        isProcessing: true,
        progress: 0,
        message: 'Processing URL...',
      });

      // Extract content from URL
      const urlService = URLService.getInstance();
      const content = await urlService.extractContent(url);

      setProcessingStatus({
        isProcessing: true,
        progress: 50,
        message: 'Generating summary...',
      });

      // Generate summary using Ollama
      const ollamaService = OllamaService.getInstance();
      const summary = await ollamaService.generateSummary(content, summaryOptions);

      // Create summary result
      const result: SummaryResult = {
        content: summary,
        source: url,
        timestamp: Date.now(),
        options: summaryOptions
      };

      setSummaryResult(result);
      setProcessingStatus({
        isProcessing: false,
        progress: 100,
        message: 'Summary generated successfully',
      });
    } catch (error) {
      console.error('Error processing URL:', error);
      setProcessingStatus({
        isProcessing: false,
        progress: 0,
        message: `Error processing URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Content Summarizer
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FileUploader onFileProcess={handleFileProcess} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <URLInput onURLProcess={handleURLProcess} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <SummaryOptions options={summaryOptions} onChange={setSummaryOptions} />
      </Box>

      {processingStatus.message && (
        <Alert severity={processingStatus.isProcessing ? 'info' : 'success'} sx={{ mb: 4 }}>
          {processingStatus.message}
        </Alert>
      )}

      {summaryResult && (
        <Box sx={{ mb: 4 }}>
          <SummaryDisplay result={summaryResult} />
        </Box>
      )}
    </Container>
  );
};

export default App; 