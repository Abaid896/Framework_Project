import React from 'react';

const LoadingSpinner = () => {
  const spinnerStyles = `
    .loading-spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5); 
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999; 
    }

    .loading-spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-top: 4px solid #3498db; 
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{spinnerStyles}</style>
      <div className="loading-spinner-overlay">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
