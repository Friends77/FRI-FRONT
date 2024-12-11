import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { AUTH_PATH, ROOT_PATH } from "@/constants/routes";
import LoginPage from "@/pages/login";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
