import React from 'react';

const SettingsControls = ({ 
  analysisType, 
  setAnalysisType, 
  depth, 
  setDepth, 
  docStyle, 
  setDocStyle,
  onProcess
}) => {
  return (
    <div className="card settings-card">
      <div className="settings-controls">
        <div className="control-group">
          <label htmlFor="analysis-type">Analysis Type</label>
          <select 
            id="analysis-type"
            value={analysisType} 
            onChange={(e) => setAnalysisType(e.target.value)}
          >
            <option value="explain">Code Explanation</option>
            <option value="docs">Documentation Generation</option>
            <option value="review">Code Review</option>
          </select>
        </div>
        
        {analysisType === 'explain' && (
          <div className="control-group">
            <label htmlFor="depth">Explanation Depth</label>
            <select 
              id="depth"
              value={depth} 
              onChange={(e) => setDepth(e.target.value)}
            >
              <option value="basic">Basic - Key points only</option>
              <option value="detailed">Detailed - With examples</option>
              <option value="comprehensive">Comprehensive - In-depth analysis</option>
            </select>
          </div>
        )}
        
        {analysisType === 'docs' && (
          <div className="control-group">
            <label htmlFor="doc-style">Documentation Style</label>
            <select 
              id="doc-style"
              value={docStyle} 
              onChange={(e) => setDocStyle(e.target.value)}
            >
              <option value="standard">Standard</option>
              <option value="jsdoc">JSDoc</option>
              <option value="google">Google Style</option>
              <option value="pydoc">PyDoc</option>
              <option value="javadoc">JavaDoc</option>
            </select>
          </div>
        )}
        
        <button 
          className="process-button" 
          onClick={onProcess}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
          </svg>
          Process Code
        </button>
      </div>
    </div>
  );
};

export default SettingsControls; 