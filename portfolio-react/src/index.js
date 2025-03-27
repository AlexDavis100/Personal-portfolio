import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root using React 18's createRoot API
const root = createRoot(rootElement);

// Render the app with StrictMode for better development experience
// StrictMode helps catch issues early and improves performance
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
