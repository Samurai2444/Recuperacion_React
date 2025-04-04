import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [errors, setErrors] = useState({});
    const { createTask } = useTask();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const nombre = e.target.name;
        setFormData({ ...formData, [nombre]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask(formData); // Guardar la tarea en la base de datos
            navigate('/'); // Redirigir a la página de inicio
        } catch (error) {
            setErrors({ message: 'Error al guardar la tarea' });
        }
    };

    return (
        <div>
            <div>
                <header>
                    <h1>Ejercicio 1</h1>
                </header>
                <div className='w-125'>
                    <h1>Tasks</h1>
                    {errors.message && <p className="text-red-500">{errors.message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type='text'
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;