import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import { config } from '../config';

interface FileUploaderProps {
  onFileProcess: (file: File) => Promise<void>;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcess, disabled }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (file.size > config.maxFileSize) {
      alert(`File size exceeds the maximum limit of ${config.maxFileSize / 1024 / 1024}MB`);
      return;
    }

    await onFileProcess(file);
  }, [onFileProcess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upload PDF
      </Typography>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider'
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? 'Drop the PDF here'
            : 'Drag and drop a PDF file here, or click to select'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Maximum file size: {config.maxFileSize / 1024 / 1024}MB
        </Typography>
      </Paper>
    </Box>
  );
};

export default FileUploader; 