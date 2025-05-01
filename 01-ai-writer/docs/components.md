# Component Documentation

## Editor Component

### Overview
The main editor component that provides the writing interface and content generation functionality.

### Props
```typescript
interface EditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}
```

### Features
- Markdown editing with syntax highlighting
- Real-time content generation
- Role-based writing styles
- Streaming response handling

### Usage
```tsx
import Editor from './components/Editor';

function App() {
  return (
    <Editor
      initialContent="# Start writing..."
      onContentChange={(content) => console.log(content)}
    />
  );
}
```

## Navbar Component

### Overview
Navigation component that provides the application header and navigation controls.

### Props
```typescript
interface NavbarProps {
  title?: string;
}
```

### Features
- Application title display
- Navigation menu
- Responsive design

### Usage
```tsx
import Navbar from './components/Navbar';

function App() {
  return <Navbar title="AI Writer" />;
}
```

## Role Selection

### Overview
Component for selecting the writing role and style.

### Available Roles
1. **CTO**
   - Technical leadership content
   - Strategic planning
   - Technical vision

2. **Marketing Professional**
   - Marketing copy
   - Social media content
   - Brand messaging

3. **Technical Writer**
   - Documentation
   - Technical guides
   - API documentation

4. **Custom**
   - User-defined style
   - Custom prompts
   - Flexible formatting

### Usage
```tsx
const roles = [
  { value: 'cto', label: 'CTO' },
  { value: 'marketing', label: 'Marketing Professional' },
  { value: 'technical', label: 'Technical Writer' },
  { value: 'custom', label: 'Custom' }
];
```

## Content Generation

### Overview
Handles the interaction with the Ollama API for content generation.

### Features
- Streaming response handling
- Error management
- Progress indication
- Content formatting

### API Integration
```typescript
interface GenerateRequest {
  prompt: string;
  role: string;
  model: string;
}

interface GenerateResponse {
  content: string;
  status: 'success' | 'error';
  error?: string;
}
```

### Usage
```typescript
const generateContent = async (prompt: string, role: string) => {
  try {
    const response = await axios.post('/api/generate', {
      prompt,
      role,
      model: 'llama3'
    }, {
      responseType: 'stream'
    });
    // Handle streaming response
  } catch (error) {
    // Handle error
  }
};
```

## Styling

### Theme Configuration
```typescript
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});
```

### CSS Classes
- `.app`: Main application container
- `.main-content`: Primary content area
- `.editor-container`: Editor wrapper
- `.navbar`: Navigation bar
- `.role-selector`: Role selection component 