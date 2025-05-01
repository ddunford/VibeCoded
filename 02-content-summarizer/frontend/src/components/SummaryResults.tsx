import { Box, Typography, Paper, Chip } from '@mui/material';
import { SummaryResult } from '../types';

interface SummaryResultsProps {
  results: SummaryResult[];
}

export default function SummaryResults({ results }: SummaryResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Summary Results
      </Typography>
      {results.map((result) => (
        <Paper key={result.id} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Source: {result.source}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {new Date(result.timestamp).toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {result.summary}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              size="small"
              label={`Model: ${result.options.model}`}
              variant="outlined"
            />
            <Chip
              size="small"
              label={`Max Tokens: ${result.options.maxTokens}`}
              variant="outlined"
            />
            <Chip
              size="small"
              label={`Temperature: ${result.options.temperature}`}
              variant="outlined"
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
} 