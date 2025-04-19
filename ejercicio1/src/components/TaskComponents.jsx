import React from "react";
import { useTask } from "../context/TaskContext";

const TaskList = () => {
  
  const { task, error } = useTask();

  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>
  }
  return (
    <div>
      <h1>Task List</h1>
      <p>Aqui se encuentran todas las tareas creadas.</p>
      (
        <p>Cargando los datos</p>
      ) : (
        <ul>
          {task.map((task) => (
            <li key={task._id}>{task.name}</li>
          ))}
        </ul>
      )
    </div>
  );
};

export default TaskList;
