import { createBrowserRouter, RouterProvider } from "react-router";
import { ROOT_PATH } from "../constants/common/path";
import App from "./../App";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROOT_PATH.ROOT,
      element: <App />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
}
