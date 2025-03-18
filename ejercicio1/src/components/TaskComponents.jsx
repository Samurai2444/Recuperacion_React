import React from "react";
import { useTask } from "../context/TaskContext";
const API_URL = import.meta.env.VITE_API_URL;

const TaskList = () => {
  
  const { task, loading, error } = useTask();

  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>
  }
  return (
    <div>
      <h1>Task List</h1>
      <p>Here you can find all our products.</p>
      {loading ? (
        <p>Cargando los datos</p>
      ) : (
        <ul>
          {task.map((task) => (
            <li key={task._id}>{task.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
