import { Outlet } from 'react-router';
import './App.css';
import AuthInterceptor from './components/auth/AuthInterceptor';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useLogout } from './hooks/auth/useLogout';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from './recoil/auth/isLoggedIn';
import accessTokenAtom from './recoil/auth/accessToken';
import TokenRefresher from './components/auth/TokenRefresher';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
  const { mutate } = useLogout();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const at = useRecoilValue(accessTokenAtom);

  const handleLogout = () => {
    mutate();
  };
  return (
    <AuthInterceptor>
      <TokenRefresher>
        <GoogleOAuthProvider clientId={googleClientId}>
          {`at: ${at}`}
          {`isLoggedIn: ${isLoggedIn}`}
          <button onClick={handleLogout}>logout</button>
          <Outlet />
        </GoogleOAuthProvider>
      </TokenRefresher>
    </AuthInterceptor>
  );
}

export default App;
