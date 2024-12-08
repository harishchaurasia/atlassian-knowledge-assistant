import React, { useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [content, setContent] = useState([]);

  const fetchContent = async () => {
    const response = await invoke('getContent', {}); // Fetch content items as an array
    setContent(response); // Set the state to the array of titles
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Knowledge Assistant</h1>
      <button
        onClick={fetchContent}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Fetch Content
      </button>
      <ul>
        {content.length > 0 ? (
          content.map((title, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {title}
            </li>
          ))
        ) : (
          <p>No content found or an error occurred.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
