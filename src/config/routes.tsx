import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Input, Output, NotFound } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Input />,
      },
      {
        path: "/output",
        element: <Output />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
