import React, { useState, useCallback, useEffect } from 'react';
import { Box, Paper, Button, Select, MenuItem, FormControl, InputLabel, Typography, TextField, Grid } from '@mui/material';
import { config } from '../config';

interface ChatProps {
  onContentUpdate: (content: string) => void;
}

interface Model {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
}

const roles = [
  { value: 'cto', label: 'CTO' },
  { value: 'marketing', label: 'Marketing Professional' },
  { value: 'technical', label: 'Technical Writer' },
  { value: 'custom', label: 'Custom' }
];

const Chat: React.FC<ChatProps> = ({ onContentUpdate }) => {
  const [selectedRole, setSelectedRole] = useState('cto');
  const [selectedModel, setSelectedModel] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`${config.ollama.apiUrl}/api/tags`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const models = data.models || [];
        setAvailableModels(models);
        
        // Set the default model from config if it exists in the available models
        const defaultModel = config.ollama.model;
        if (models.some((model: Model) => model.name === defaultModel)) {
          setSelectedModel(defaultModel);
        } else if (models.length > 0) {
          // If default model is not available, use the first model
          setSelectedModel(models[0].name);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setIsLoadingModels(false);
      }
    };

    fetchModels();
  }, []);

  const updateContent = useCallback((newContent: string) => {
    onContentUpdate(newContent);
  }, [onContentUpdate]);

  const generateContent = async () => {
    if (!inputContent.trim() || !selectedModel) return;
    
    setIsGenerating(true);
    let result = '';
    
    try {
      const response = await fetch(`${config.ollama.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content: `You are a ${selectedRole}. Write in a professional and engaging manner.`
            },
            {
              role: "user",
              content: inputContent
            }
          ],
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            let newContent = '';
            if (data.response) {
              newContent = data.response;
            } else if (data.message?.content) {
              newContent = data.message.content;
            }
            
            if (newContent) {
              result += newContent;
              updateContent(result);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>AI Model</InputLabel>
              <Select
                value={selectedModel}
                label="AI Model"
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isLoadingModels}
              >
                {availableModels.map((model) => (
                  <MenuItem key={model.name} value={model.name}>
                    {model.name} ({model.details?.parameter_size || 'unknown'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <TextField
          fullWidth
          multiline
          rows={2}
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Enter your prompt here..."
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={generateContent}
          disabled={isGenerating || !inputContent.trim() || !selectedModel}
          fullWidth
        >
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Chat; 