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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask({ ...formData, _id: Date.now() }); // Generar un ID único
            navigate('/'); // Redirigir a la página de inicio
        } catch (error) {
            setErrors({ message: 'Error al guardar la tarea' });
        }
    };

    return (
        <div>
            <h1>Crear Tarea</h1>
            {errors.message && <p className="text-red-500">{errors.message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre de la tarea"
                    required
                    className="w-full px-4 py-2 text-lg border rounded-lg"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción de la tarea"
                    required
                    className="w-full px-4 py-2 text-lg border rounded-lg"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default CreateTask;