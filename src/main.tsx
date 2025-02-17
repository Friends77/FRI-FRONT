import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import AppRouter from './routes/AppRouter.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/apis/@core/queryClient.ts';
import { ThemeProvider } from 'styled-components';
import { Theme } from './styles/theme.ts';
import GlobalStyle from './styles/GlobalStyle.ts';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <AppRouter />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </CookiesProvider>
  </StrictMode>,
);
