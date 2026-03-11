/**
 * Application entry point (code walkthrough).
 * Renders the React tree into #root and sets up routing for the whole app.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

// React Router v7 future flags: opt-in to new behavior (state updates in startTransition, splat route resolution)
const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter future={routerFuture}>
      <App />
    </BrowserRouter>
  </StrictMode>
);