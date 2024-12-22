import { Outlet } from "react-router";
import "./App.css";
import AuthInterceptor from "./components/auth/AuthInterceptor";
import TokenRefresher from "./components/auth/TokenRefresher";

function App() {
  return (
    <AuthInterceptor>
      <TokenRefresher>
        <Outlet />
      </TokenRefresher>
    </AuthInterceptor>
  );
}

export default App;
