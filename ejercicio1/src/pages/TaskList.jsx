import React, { useState } from 'react'

const TaskList = () => {
    const [tareas, setTareas] = useState([]);

    // Calcular tareas completadas
    const totalTareas = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completed).length;

    return (
        <div>
            <div>
                <h1>Task Lists</h1>

                {/* Contador de tareas */}
                <div className="text-white mb-4">
                    <p>
                        Tareas completadas: {tareasCompletadas} / {totalTareas}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-black">
                    {tareas.map((tarea) => (
                        <div
                            key={tarea.id} // id del tarea
                            className=" bg-white rounded-xl p-6 hover:shadow-sm"
                        >
                            <div className="relative group">
                                <h2 className="text-xl font-bold text-center mt-4">
                                    {tarea.name}
                                </h2>
                            </div>
                        </div>
                    ))}
                    <div>
                        <a href="/create">Crear nueva tarea</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskList