import { Outlet } from "react-router";
import "./App.css";
import AuthInterceptor from "./components/AuthInterceptor";
import TokenRefresher from "./components/TokenRefresher";

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
