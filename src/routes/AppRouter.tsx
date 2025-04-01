import { AUTH_PATH, CHAT_PATH, ROOT_PATH, USER_PATH } from '@/constants/routes';
import LoginPage from '@/pages/auth/login';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import SignUpRootLayout from '@/pages/auth/signUpRoot';
import SignUpPage from '@/pages/auth/signUp';
import NaverLoginCallbackPage from '@/pages/auth/callback/naver';
import ResetPasswordPage from '@/pages/auth/resetPassword';
import GoogleLoginCallback from '@/pages/auth/callback/google';
import ChatRoomPage from '@/pages/chat/chatRoom';
import CreateChatRoom from '@/pages/chat/createChatRoom';
import HomePage from '@/pages/home';
import ProfilePage from '@/pages/user/profile';
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
              path: CHAT_PATH.CHAT_ROOM,
              element: <ChatRoomPage />,
            },
            {
              path: CHAT_PATH.CHAT_ROOM_CREATE,
              element: <CreateChatRoom />,
            },
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: USER_PATH.PROFILE,
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
