import { AUTH_PATH, ROOT_PATH } from "@/constants/routes";
import LoginPage from "@/pages/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import SignUpRootLayout from "@/pages/auth/SignUpRoot";
import SignUpPage from "@/pages/auth/SignUp";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
