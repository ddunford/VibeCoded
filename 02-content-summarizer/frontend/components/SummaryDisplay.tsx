import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { SummaryResult } from '../types';

interface SummaryDisplayProps {
  result: SummaryResult;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ result }) => {
  const formatContent = (content: string, format: string) => {
    switch (format) {
      case 'bullet':
        return content.split('\n').map((line, index) => (
          <Typography key={index} component="div" sx={{ mb: 1 }}>
            • {line}
          </Typography>
        ));
      case 'key-points':
        return content.split('\n').map((line, index) => (
          <Typography key={index} component="div" sx={{ mb: 1 }}>
            {index + 1}. {line}
          </Typography>
        ));
      default:
        return (
          <Typography component="div" sx={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
        {formatContent(result.content, result.options.format)}
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
        <Typography variant="caption">
          Source: {result.source}
        </Typography>
        <Typography variant="caption">
          Generated: {new Date(result.timestamp).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default SummaryDisplay; 