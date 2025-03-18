import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <TaskProvider>
        <RouterProvider router={router} />
    </TaskProvider>
  );
};

export default App;
