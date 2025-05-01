# API Documentation

## Ollama Integration

### Base URL
```
http://localhost:11434
```

### Endpoints

#### Generate Content
```http
POST /api/generate
```

**Request Body**
```json
{
  "prompt": "string",
  "role": "string",
  "model": "string"
}
```

**Parameters**
- `prompt` (string, required): The input text to generate content from
- `role` (string, required): The writing role to use (cto, marketing, technical, custom)
- `model` (string, required): The Ollama model to use (default: llama3)

**Response**
Streaming text content

**Example**
```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a technical blog post about AI",
    "role": "cto",
    "model": "llama3"
  }'
```

## Role-Based Prompts

### CTO Role
```typescript
const ctoPrompt = `You are a CTO writing about technology. 
Focus on strategic insights, technical leadership, and innovation.
Write in a professional, authoritative tone.`;
```

### Marketing Role
```typescript
const marketingPrompt = `You are a marketing professional.
Focus on engaging content, brand voice, and customer value.
Write in a persuasive, engaging tone.`;
```

### Technical Writer Role
```typescript
const technicalPrompt = `You are a technical writer.
Focus on clarity, accuracy, and comprehensive documentation.
Write in a clear, instructional tone.`;
```

## Error Handling

### Common Errors

1. **Model Not Available**
```json
{
  "error": "Model not found",
  "status": 404
}
```

2. **Invalid Request**
```json
{
  "error": "Invalid request parameters",
  "status": 400
}
```

3. **Server Error**
```json
{
  "error": "Internal server error",
  "status": 500
}
```

### Error Handling Example
```typescript
try {
  const response = await axios.post('/api/generate', {
    prompt,
    role,
    model
  });
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        console.error('Model not found');
        break;
      case 400:
        console.error('Invalid request');
        break;
      default:
        console.error('Server error');
    }
  }
}
```

## Streaming Response

### Implementation
```typescript
const handleStreamingResponse = async (response: Response) => {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    // Process chunk
  }
};
```

### Best Practices
1. Handle connection errors
2. Implement timeout mechanisms
3. Process chunks efficiently
4. Update UI incrementally

## Configuration

### Environment Variables
```env
OLLAMA_API_URL=http://localhost:11434
MODEL_NAME=llama3
```

### Model Parameters
```typescript
interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}
```

## Rate Limiting

### Implementation
```typescript
const rateLimiter = {
  maxRequests: 10,
  timeWindow: 60000, // 1 minute
  requests: new Map<string, number[]>()
};
```

### Usage
```typescript
const checkRateLimit = (userId: string): boolean => {
  const now = Date.now();
  const userRequests = rateLimiter.requests.get(userId) || [];
  
  // Remove old requests
  const recentRequests = userRequests.filter(
    time => now - time < rateLimiter.timeWindow
  );
  
  if (recentRequests.length >= rateLimiter.maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimiter.requests.set(userId, recentRequests);
  return true;
};
``` 