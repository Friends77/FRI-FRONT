import { Outlet } from "react-router";
import "./App.css";
import AuthInterceptor from "./components/authInterceptor/AuthInterceptor";
import TokenRefresher from "./components/tokenRefresher/TokenRefresher";

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
