import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import AppRouter from "./routes/AppRouter.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/apis/@core/queryClient.ts";
import { ThemeProvider } from "styled-components";
import { Theme } from "./styles/theme.ts";
import GlobalStyle from "./styles/GlobalStyle.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
