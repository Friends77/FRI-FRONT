import { Outlet } from 'react-router';
import AuthInterceptor from './components/auth/AuthInterceptor';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TokenRefresher from './components/auth/TokenRefresher';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import { ErrorInfo } from 'react';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  const handleError = (error: Error, info: ErrorInfo) => {
    // 에러 트래킹 서비스와 연동 가능(Sentry 등)
    console.error('에러 발생!', error);
    console.error('컴포넌트 스택:', info.componentStack);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <AuthInterceptor>
        <TokenRefresher>
          <GoogleOAuthProvider clientId={googleClientId}>
            <Outlet />
          </GoogleOAuthProvider>
        </TokenRefresher>
      </AuthInterceptor>
    </ErrorBoundary>
  );
};

export default App;
