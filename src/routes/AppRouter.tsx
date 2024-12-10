import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { ROOT_PATH } from "@/constants/routes";

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
