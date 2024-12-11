import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import AppRouter from "./routes/AppRouter.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/apis/@core/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
