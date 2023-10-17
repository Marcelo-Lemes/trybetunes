import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SongsProvider from './contexts/SongsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SongsProvider>
    <App />
  </SongsProvider>
  </React.StrictMode>
);
