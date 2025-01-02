import { Outlet } from 'react-router';
import './App.css';
import AuthInterceptor from './components/auth/AuthInterceptor';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TokenRefresher from './components/auth/TokenRefresher';

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
