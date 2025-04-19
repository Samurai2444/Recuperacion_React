import React, { useEffect } from 'react';
import { useService } from '../context/ServiceContext';
import { useNavigate } from 'react-router-dom';

const ServicePage = () => {
  const { services, getService, loading, error } = useService();
  const navigate= useNavigate();

  // Llamar a getService al montar el componente
  useEffect(() => {
    getService();
  }, []);

  const hadleBack = () => {
    navigate('/'); // Redirigir a la página de inicio
  }

  const hadleAddCart = () => {
    console.log("Añadir al carrito");
  }

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar productos: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Productos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id} // id del servicio
            className="bg-white rounded-xl p-6 hover:shadow-sm"
          >
            <div className="relative group">
              <h2 className="text-xl font-bold text-center mt-4">
                {service.nombre}
              </h2>
              <p>Precio: {service.precio} €</p>
              <p>Duración: {service.duracion} minutos</p>
              <p>Categoria: {service.categoria}</p>
            </div>
            <button onClick={hadleAddCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      <button onClick={hadleBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Volver al Inicio
      </button>
    </div>
  );
};

export default ServicePage;