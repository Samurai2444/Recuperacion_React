import { createContext, useContext, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState({});
    const [error, setError] = useState(null)

    const getTask = async () => {
      try {
          const response = await fetch(`${API_URL}/task`);
          if (!response.ok) {
              throw new Error(`Error al obtener las tareas`);
          }
          const data = await response.json();
          setTask(data); // Actualizar el estado con las tareas obtenidas
      } catch (error) {
          setError(error);
          console.error("Error al obtener las tareas (error total):", error);
          
      }
  };

  const createTask = async ({ name, description, checked = false }) => {
    try {
        // Obtener el ID más alto de las tareas existentes
        const maxId = task.length > 0 ? Math.max(...task.map(t => t.id)) : 0;
        const newId = maxId + 1;

        // Crear la nueva tarea con el ID incrementado
        const response = await fetch(`${API_URL}/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: newId, name, description, checked }),
        });

        if (!response.ok) {
            throw new Error("Error al crear la tarea");
        }

        const newTask = await response.json();
        setTask((prevTasks) => [...prevTasks, newTask]); // Agregar la nueva tarea al estado
    } catch (error) {
        console.error("Error al crear la tarea:", error);
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
        console.error("Error al eliminar la tarea (error total)", error);
      }
    };

    const toggleCheck = async (_id) => {
        try {
            // Encontrar la tarea específica
            const tarea = task.find((t) => t._id === _id);
            if (!tarea) {
                throw new Error("Tarea no encontrada");
            }

            // Invertir el estado de `checked`
            const updatedChecked = !tarea.checked;

            // Enviar la actualización al servidor
            const response = await fetch(`${API_URL}/task/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ checked: updatedChecked }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el estado de la tarea");
            }

            // Actualizar el estado global de las tareas
            const updatedTask = await response.json();
            setTask((prevTasks) =>
                prevTasks.map((t) =>
                    t._id === _id ? { ...t, checked: updatedChecked } : t
                )
            );
        } catch (error) {
            console.error("Error al completar la tarea:", error);
        }
    };

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
