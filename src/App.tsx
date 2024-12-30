import { Outlet } from "react-router";
import "./App.css";
import AuthInterceptor from "./components/auth/AuthInterceptor";
import TokenRefresher from "./components/auth/TokenRefresher";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
  return (
    <AuthInterceptor>
      <TokenRefresher>
        <GoogleOAuthProvider clientId={googleClientId}>
          <Outlet />
        </GoogleOAuthProvider>
      </TokenRefresher>
    </AuthInterceptor>
  );
}

export default App;
