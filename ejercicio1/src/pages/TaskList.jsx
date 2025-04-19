import React, { useEffect } from 'react';
import { useTask } from '../context/TaskContext';

const TaskList = () => {
    const { task, getTask, toggleCheck } = useTask();

    useEffect(() => {
        getTask(); // Obtener las tareas al cargar el componente
    }, []);

    // Asegurarse de que `task` sea un array
    const totalTareas = Array.isArray(task) ? task.length : 0;
    const tareasCompletadas = Array.isArray(task)
        ? task.filter(tarea => tarea.completed).length
        : 0;

    return (
        <div>
            <h1>Task Lists</h1>
            <div className="mb-4">
                <p>Tareas completadas: {tareasCompletadas} / {totalTareas}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.isArray(task) && task.map((tarea) => (
                    <div
                        key={tarea._id}
                        className="bg-white rounded-xl p-6 hover:shadow-sm"
                    >
                        <h2 className="text-xl font-bold text-center mt-4">
                            {tarea.name}
                        </h2>
                        <p>
                            {tarea.description}
                        </p>
                        <button
                            onClick={() => toggleCheck(tarea._id)}
                            className="w-full px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-700 transition duration-200"
                        >
                            Completar
                        </button>
                    </div>
                ))}
                <div className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-200">
                    <a href="/create">Crear nueva tarea</a>
                </div>
            </div>
        </div>
    );
};

export default TaskList;