import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import AppRouter from "./routes/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  </StrictMode>
);
