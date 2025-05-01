import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { URLService } from '../services/url';

interface URLInputProps {
  onURLProcess: (url: string) => Promise<void>;
  disabled?: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onURLProcess, disabled }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    const urlService = URLService.getInstance();
    if (!urlService.validateURL(url)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      await onURLProcess(url);
    } catch (error) {
      setError('Failed to process URL');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Enter URL
      </Typography>
      <TextField
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/article"
        error={!!error}
        helperText={error}
        disabled={disabled}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={disabled || !url.trim()}
      >
        Process URL
      </Button>
    </Box>
  );
};

export default URLInput; 