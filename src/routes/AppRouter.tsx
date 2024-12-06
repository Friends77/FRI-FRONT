import App from '@/App';
import { ROOT_PATH, SIGN_UP_PATH } from '@/constants/path';
import ErrorPage from '@/pages/error/Error';
import SignUpPage from '@/pages/signup/SignUp';
import SingUpRootLayout from '@/pages/signup/SignUpRoot';
import SignUpToEmail from '@/pages/signup/SignUpToEmail';
import { createBrowserRouter, RouterProvider } from 'react-router';

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROOT_PATH.ROOT,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: SIGN_UP_PATH.SIGN_UP,
          element: <SingUpRootLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <SignUpPage />,
            },
            {
              path: SIGN_UP_PATH.SIGN_UP_TO_EMAIL,
              element: <SignUpToEmail />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
