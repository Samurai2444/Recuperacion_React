import { createContext, useContext, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState({});

  const getTask = async () => {
    try {
      const response = await fetch(`${API_URL}/task`);
      if (!response.ok) {
        throw new Error("Error al obtener las tareas");
      }
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log("Error al obtener las tareas (error total)", error);
    }
  };

  const createTask = async ({ name, description, checked=false }) => {
    try {
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, checked }),
      });

      if (!response.ok) {
        throw new Error("Tarea existente, error al crear tarea");
      }
      // Si estoy aquí es porque la tarea se ha creado correctamente
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log("Error al crear la tarea (error total)", error);
    }
  };

  const deleteTask = async(_id) => {
    try {
        const response = await fetch(`${API_URL}/task/${_id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Tarea no existente, error al eliminar tarea");
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.log("Error al eliminar la tarea (error total)", error);
      }
    };

    const toggleCheck = async(_id) =>{
        try {
            const response = await fetch(`${API_URL}/task/${_id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ checked: !task.checked }),
            });
      
            if (!response.ok) {
              throw new Error("Tarea ya completada, error al completar la tarea");
            }
            // Si estoy aquí es porque el usuario se ha logueado correctamente
            const data = await response.json();
            setTask(data);
          } catch (error) {
            console.log("Error al completar la tarea (error total)", error);
          }
    }

  return (
    <TaskContext.Provider value={{ task, createTask, deleteTask, toggleCheck, getTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};
