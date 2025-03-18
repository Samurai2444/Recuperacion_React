import React, { useState } from 'react'
import { useTask } from '../context/TaskContext';

const TaskPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
      });
      const { createTask } = useTask();
    const handleChange = (e) => {
        const nombre = e.target.name;
        setFormData({ ...formData, [nombre]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask();
    };
  return (
    <div>
        <div>
            <header>
                Ejercicio 1
            </header>
            <div className='w-125'>
                <h1>Tasks</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type='text'
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"                
                    />
                    <input type="text" 
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </form>
                <button type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Save
                </button>
            </div>
            <div>
                HOla
            </div>
        </div>
    </div>
  )
}

export default TaskPage