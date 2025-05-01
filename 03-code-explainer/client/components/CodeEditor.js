import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onCodeChange, language, setLanguage }) => {
  const [theme, setTheme] = useState('vs-dark');
  const editorRef = useRef(null);
  
  const handleEditorChange = (value) => {
    onCodeChange(value);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    
    // Add paste event listener for auto-detection
    editor.onDidPaste(() => {
      const code = editor.getValue();
      const detectedLanguage = detectLanguage(code);
      if (detectedLanguage) {
        setLanguage(detectedLanguage);
      }
    });
  };

  // Simple language detection based on common patterns
  const detectLanguage = (code) => {
    const trimmedCode = code.trim();
    
    // Python detection
    if (trimmedCode.includes('def ') || 
        trimmedCode.includes('import ') && !trimmedCode.includes(';') || 
        trimmedCode.includes('print(')) {
      return 'python';
    }
    
    // JavaScript/TypeScript detection
    if (trimmedCode.includes('function ') || 
        trimmedCode.includes('=>') ||
        trimmedCode.includes('console.log') || 
        trimmedCode.match(/const|let|var\s+\w+\s*=/)) {
      
      // Check for TypeScript
      if (trimmedCode.includes(': ') && 
          (trimmedCode.includes('interface ') || 
           trimmedCode.includes('type ') || 
           trimmedCode.match(/:\s*(string|number|boolean|any)\b/))) {
        return 'typescript';
      }
      
      return 'javascript';
    }
    
    // Java detection
    if (trimmedCode.includes('public class ') || 
        trimmedCode.includes('public static void main') || 
        trimmedCode.match(/\w+\s+\w+\s*=\s*new\s+\w+/)) {
      return 'java';
    }
    
    // C++ detection
    if (trimmedCode.includes('#include <') || 
        trimmedCode.includes('std::') || 
        trimmedCode.includes('int main(')) {
      return 'cpp';
    }
    
    // C# detection
    if (trimmedCode.includes('using System;') || 
        trimmedCode.includes('namespace ') || 
        trimmedCode.includes('public class ') && trimmedCode.includes('{')) {
      return 'csharp';
    }
    
    // HTML detection
    if (trimmedCode.includes('<!DOCTYPE html>') || 
        trimmedCode.includes('<html>') || 
        (trimmedCode.startsWith('<') && trimmedCode.includes('>'))) {
      return 'html';
    }
    
    // CSS detection
    if (trimmedCode.includes('{') && 
        trimmedCode.includes('}') && 
        trimmedCode.includes(':') && 
        !trimmedCode.includes('function')) {
      return 'css';
    }
    
    // If no clear indicators, return null to keep current language
    return null;
  };

  return (
    <div className="card editor-card">
      <div className="editor-controls">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="language-selector"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="theme-selector"
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
      <div className="editor-container">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme={theme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            fontFamily: "'Fira Code', 'Consolas', monospace",
            fontSize: 14,
            lineNumbers: 'on',
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 2,
          }}
        />
      </div>
      <div className="editor-footer">
        <span className="editor-tip">Tip: Code language will be auto-detected when you paste code</span>
      </div>
    </div>
  );
};

export default CodeEditor; 