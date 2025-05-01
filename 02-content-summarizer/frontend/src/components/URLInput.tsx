import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface URLInputProps {
  onURLProcess: (url: string) => void;
}

export default function URLInput({ onURLProcess }: URLInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onURLProcess(url.trim());
      setUrl('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        label="Enter URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/article"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!url.trim()}
      >
        Summarize
      </Button>
    </Box>
  );
} 