import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import TaskPage from "../pages/TaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TaskPage />,
      },  
    ],
  },
]);
