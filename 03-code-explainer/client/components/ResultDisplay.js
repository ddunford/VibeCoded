const ResultDisplay = ({ result, isLoading, analysisType }) => {
  // Format code blocks and improve text rendering in the result
  const formatResult = (text) => {
    if (!text) return null;
    
    // Replace markdown code blocks with styled HTML
    let formattedText = text.replace(
      /```(\w*)\n([\s\S]*?)```/g, 
      (_, language, code) => (
        `<div class="code-block${language ? ` language-${language}` : ''}">
          <div class="code-header">${language || 'code'}</div>
          <pre class="code-content">${escapeHtml(code.trim())}</pre>
        </div>`
      )
    );
    
    // Format normal paragraphs for better readability
    formattedText = formattedText
      // Convert line breaks to paragraphs
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
    
    // Add syntax highlighting for inline code
    formattedText = formattedText.replace(
      /`([^`]+)`/g, 
      (_, code) => `<code class="inline-code">${escapeHtml(code)}</code>`
    );
    
    return { __html: formattedText };
  };
  
  // Helper function to escape HTML
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
  
  // Title for the results based on analysis type
  const getResultTitle = () => {
    if (!analysisType) return 'Results';
    
    switch (analysisType) {
      case 'explain':
        return 'Code Explanation';
      case 'docs':
        return 'Generated Documentation';
      case 'review':
        return 'Code Review';
      default:
        return 'Results';
    }
  };

  if (isLoading) {
    return (
      <div className="card result-container">
        <div className="result-header">
          <h2>{getResultTitle()}</h2>
        </div>
        <div className="loading">Processing your code...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card result-container">
        <div className="result-header">
          <h2>{getResultTitle()}</h2>
        </div>
        <div className="no-result">
          Your results will appear here after processing. 
          <p className="tip">Enter your code in the editor and click "Process Code" to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card result-container">
      <div className="result-header">
        <h2>{getResultTitle()}</h2>
      </div>
      {formatResult(result) ? (
        <div className="result-text" dangerouslySetInnerHTML={formatResult(result)} />
      ) : (
        <pre className="result-text">{result}</pre>
      )}
    </div>
  );
};

export default ResultDisplay; 