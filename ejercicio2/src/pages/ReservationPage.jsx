import React, { use, useEffect, useState } from 'react';
import { useReserva } from '../context/ReservaContext';
import { useAuth } from '../context/AuthContext';
import { useService } from '../context/ServiceContext';
import { useTime } from '../context/TimeContext';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
  const { getReserva, setNewReserva, reserva, loading, error } = useReserva();
  const { services, getService } = useService();
  const { isAuthenticated, token } = useAuth();
  const { setReservationTime } = useTime([]);
  const [newReservation, setNewReservation] = useState({
    fecha: '',
    horaInicio: '',
    servicios: [],
  });
  const navigate= useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      getReserva();
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    getService(); // Llamar a getService al montar el componente
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation({ ...newReservation, [name]: value });
  };

  const handleServiceSelection = (serviceId) => {
    setNewReservation((prev) => ({
      ...prev,
      servicios: prev.servicios.includes(serviceId)
        ? prev.servicios.filter((id) => id !== serviceId)
        : [...prev.servicios, serviceId],
    }));
  };

  const hadleBack = () => {
    navigate('/'); // Redirigir a la página de inicio
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(newReservation);
  console.log(newReservation.horaInicio);
  if (!token) {
    alert('Debes iniciar sesión para realizar una reserva.');
    return;
  }
  // Calcular la duración total sumando la duración de los servicios seleccionados
  const duracionTotal = newReservation.servicios.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId); // Buscar el servicio por ID
    return total + (service ? service.duracion : 0); // Sumar la duración si el servicio existe
  }, 0);
  // Convertir la hora de inicio a minutos desde la medianoche
  const [horas, minutos] = newReservation.horaInicio.split(':').map(Number);
  const horaInicioMinutos = horas * 60 + minutos;
    try {
      // Validar la hora de inicio y la duración con setReservationTime
      await setReservationTime(horaInicioMinutos, duracionTotal);
      // Si la validación es exitosa, crear la reserva
      const reservationData = {
        ...newReservation,
        usuarioId: token,
        duracionTotal,
      };
      await setNewReserva(reservationData);
      // Reiniciar el formulario
      setNewReservation({ fecha: '', horaInicio: '', servicios: [] });
    } catch (error) {
      alert(error); // Mostrar el error si setReservationTime falla
    }
  }; 

  if (loading) {
    return <div>Cargando reservas...</div>;
  }

  if (error) {
    return <div>Error al cargar reservas: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={hadleBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Volver al Inicio
      </button>
      <h1 className="text-3xl font-bold mb-6">Reservar Cita</h1>

      {/* Formulario para crear una nueva reserva */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={newReservation.fecha}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Hora de Inicio</label>
          <input
            type="time"
            name="horaInicio"
            value={newReservation.horaInicio}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Servicios</label>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`service-${service.id}`}
                  checked={newReservation.servicios.includes(service.id)}
                  onChange={() => handleServiceSelection(service.id)}
                  className="mr-2"
                />
                <label htmlFor={`service-${service.id}`} className="text-gray-700">
                  {service.nombre} - {service.precio} €
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Reservar
        </button>
      </form>

      {/* Lista de reservas existentes */}
      <h2 className="text-2xl font-semibold mb-4">Reservas Recientes</h2>
      {reserva.length === 0 ? (
        <p className="text-gray-600">No hay reservas registradas.</p>
      ) : (
        <ul className="space-y-4">
          {reserva.map((res) => (
            <li key={res.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="font-medium">Fecha: {res.fecha}</p>
              <p className="text-gray-700">Hora: {res.horaInicio}</p>
              <p className="text-gray-700">Servicios: {res.servicios.join(', ')}</p>
              <p className="text-gray-700">Duración Total: {res.duracionTotal} minutos</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default ReservationPage;