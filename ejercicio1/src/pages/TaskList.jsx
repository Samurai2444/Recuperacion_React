import React, { useState } from 'react'

const TaskList = () => {
    const [tareas, setTareas] = useState([]);
   
  return (
    <div>
        
            <div>
                <h1>Task Lists</h1>

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
                </div>
            </div>
    </div>
    )
}


export default TaskList