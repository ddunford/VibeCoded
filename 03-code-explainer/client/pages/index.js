import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import CodeEditor from '../components/CodeEditor';
import SettingsControls from '../components/SettingsControls';
import ResultDisplay from '../components/ResultDisplay';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysisType, setAnalysisType] = useState('explain');
  const [depth, setDepth] = useState('detailed');
  const [docStyle, setDocStyle] = useState('standard');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const processCode = async () => {
    if (!code.trim()) {
      alert('Please enter some code to analyze.');
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      let endpoint;
      let payload = { code, language };

      switch (analysisType) {
        case 'explain':
          endpoint = '/api/explain';
          payload.depth = depth;
          break;
        case 'docs':
          endpoint = '/api/generate-docs';
          payload.style = docStyle;
          break;
        case 'review':
          endpoint = '/api/review';
          break;
        default:
          endpoint = '/api/explain';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data.explanation || data.documentation || data.review);
      } else {
        setResult(`Error: ${data.error || 'Failed to process code'}`);
      }
    } catch (error) {
      console.error('Error processing code:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <Head>
        <title>Code Explainer - AI Code Analysis Tool</title>
        <meta name="description" content="AI-powered tool for code analysis, documentation, and explanation" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Header />

      <main className="container">
        <SettingsControls 
          analysisType={analysisType}
          setAnalysisType={setAnalysisType}
          depth={depth}
          setDepth={setDepth}
          docStyle={docStyle}
          setDocStyle={setDocStyle}
          onProcess={processCode}
        />
        
        <div className="main-content">
          <div className="left-panel">
            <CodeEditor 
              onCodeChange={handleCodeChange} 
              language={language}
              setLanguage={setLanguage}
            />
          </div>
          <div className="right-panel">
            <ResultDisplay 
              result={result} 
              isLoading={isLoading}
              analysisType={analysisType}
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Code Explainer | Powered by CodeLLaMA and Ollama</p>
        </div>
      </footer>
    </div>
  );
} 