import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@atlaskit/css-reset';

// Log a message when the app loads
console.log("Knowledge Assistant loaded successfully!");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
