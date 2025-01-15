import {
  AUTH_PATH,
  BOARD_PATH,
  ROOT_PATH,
  SEARCH_PATH,
  SETTING_PATH,
  USER_PATH,
} from '@/constants/routes';
import LoginPage from '@/pages/auth/login';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import SignUpRootLayout from '@/pages/auth/signUpRoot';
import SignUpPage from '@/pages/auth/signUp';
import NaverLoginCallbackPage from '@/pages/auth/callback/naver';
import ResetPasswordPage from '@/pages/auth/resetPassword';
import GoogleLoginCallback from '@/pages/auth/callback/google';
import HomePage from '@/pages/home';
import ProfilePage from '@/pages/user/profile';
import BoardPage from '@/pages/board/board';
import SettingPage from '@/pages/user/setting';
import SearchPage from '@/pages/search';
import WithNavBarLayout from '@/components/@layout/WithNavBarLayout';

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROOT_PATH.ROOT,
      element: <App />,
      children: [
        {
          path: AUTH_PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: AUTH_PATH.SIGN_UP,
          element: <SignUpRootLayout />,
          children: [
            {
              index: true,
              element: <SignUpPage />,
            },
          ],
        },
        {
          path: AUTH_PATH.NAVER_LOGIN_CALLBACK,
          element: <NaverLoginCallbackPage />,
        },
        {
          path: AUTH_PATH.GOOGLE_LOGIN_CALLBACK,
          element: <GoogleLoginCallback />,
        },
        {
          path: AUTH_PATH.RESET_PASSWORD,
          element: <ResetPasswordPage />,
        },
        {
          element: <WithNavBarLayout />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: USER_PATH.PROFILE,
              element: <ProfilePage />,
            },
            {
              path: BOARD_PATH.ROOT,
              element: <BoardPage />,
            },
            {
              path: SEARCH_PATH.ROOT,
              element: <SearchPage />,
            },
            {
              path: SETTING_PATH.ROOT,
              element: <SettingPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
