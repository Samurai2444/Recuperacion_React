import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import TaskList from "../pages/TaskList";
import CreateTask from "../pages/CreateTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TaskList />,
      }, 
      {
        path: "/create",
        element: <CreateTask />,
      }
    ],
  },
]);
