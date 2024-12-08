import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routes/AppRouter';
import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  </StrictMode>,
);
