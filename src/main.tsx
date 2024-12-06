import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routes/AppRouter';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
