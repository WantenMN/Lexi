import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Input, Output, NotFound } from "@/pages";
import MyWords from "@/pages/MyWords/MyWords";

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
        path: "/my-words",
        element: <MyWords />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
