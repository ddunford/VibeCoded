import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Paper, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import axios from 'axios';

const roles = [
  { value: 'cto', label: 'CTO' },
  { value: 'marketing', label: 'Marketing Professional' },
  { value: 'technical', label: 'Technical Writer' },
  { value: 'custom', label: 'Custom' }
];

const WritingEditor: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedRole, setSelectedRole] = useState('cto');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post('/api/generate', {
        prompt: content,
        role: selectedRole,
        model: 'llama3'
      }, {
        responseType: 'stream'
      });

      // Handle streaming response
      const reader = response.data.getReader();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        result += chunk;
        setContent(result);
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Writing Role</InputLabel>
          <Select
            value={selectedRole}
            label="Writing Role"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={generateContent}
          disabled={isGenerating}
          fullWidth
        >
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </Button>
      </Paper>
      
      <Paper sx={{ height: 'calc(100% - 120px)' }}>
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={content}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on'
          }}
        />
      </Paper>
    </Box>
  );
};

export default WritingEditor; 