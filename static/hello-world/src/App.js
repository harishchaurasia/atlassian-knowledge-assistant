import React, { useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('type=page'); // Default filter: Pages
  const [keyword, setKeyword] = useState(''); // Search keyword

  const fetchContent = async () => {
    const cql = keyword ? `${filter} AND text~"${keyword}"` : filter;
    console.log('Generated CQL query:', cql);

    const response = await invoke('searchContent', { cql });
    setContent(response);
  };

  const containerStyle = { padding: '20px', fontFamily: 'Arial, sans-serif' };
  const titleStyle = { color: '#333', marginBottom: '20px' };
  const filterContainerStyle = { display: 'flex', flexDirection: 'column', marginBottom: '20px' };
  const listStyle = { listStyleType: 'none', padding: '0' };
  const listItemStyle = {
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
  };
  const linkStyle = { textDecoration: 'none', color: '#0052cc', fontWeight: 'bold' };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Knowledge Assistant</h1>
      <div style={filterContainerStyle}>
        <label>
          <input
            type="radio"
            name="filter"
            value="type=page"
            checked={filter === 'type=page'}
            onChange={(e) => setFilter(e.target.value)}
          />
          Pages
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="type=blogpost"
            checked={filter === 'type=blogpost'}
            onChange={(e) => setFilter(e.target.value)}
          />
          Blog Posts
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="space=MYSPACE"
            checked={filter === 'space=MYSPACE'}
            onChange={(e) => setFilter(e.target.value)}
          />
          My Space (Replace MYSPACE with your space key)
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keywords (e.g., task)"
          style={{ padding: '10px', fontSize: '16px', width: '100%' }}
        />
      </div>
      <button
        onClick={fetchContent}
        style={{
          backgroundColor: '#0052cc',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        Search
      </button>
      <ul style={listStyle}>
        {content.length > 0 ? (
          content.map((item) => (
            <li key={item.id} style={listItemStyle}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {item.title}
              </a>
              <p>Type: {item.type}</p>
              <p>Created: {new Date(item.createdDate).toLocaleString()}</p>
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
