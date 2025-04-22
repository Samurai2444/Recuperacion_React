import React, { useEffect, useState } from 'react';
import { useReserva } from '../context/ReservaContext';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { getReservaByUserId, removeReserva } = useReserva();
  const { token } = useAuth(); // Obtener el token del usuario autenticado
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      if (token) {
        const reservas = await getReservaByUserId(token); // Usar el token como usuarioId
        if (reservas && Array.isArray(reservas)) {
          const now = new Date();
          setUpcomingAppointments(
            reservas.filter((reserva) => new Date(reserva.fecha) >= now)
          );
          setPastAppointments(
            reservas.filter((reserva) => new Date(reserva.fecha) < now)
          );
        }
      }
    };
    fetchReservas();
  }, [token, getReservaByUserId]);

  const hadleRemove = (id) => async () => {
    try {
      await removeReserva(id); // Llamar a la función para eliminar la reserva
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>

        {/* Citas Próximas */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Citas Próximas</h3>
          {upcomingAppointments.length === 0 ? (
            <p className="text-gray-600">No tienes citas próximas.</p>
          ) : (
            <ul className="space-y-4">
              {upcomingAppointments.map((cita) => (
                <li key={cita.id} className="bg-blue-50 p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-medium">Servicios: {cita.servicios.join(', ')}</p>
                    <p className="text-sm text-gray-600">Fecha: {cita.fecha}</p>
                    <p className="text-sm text-gray-600">Hora: {cita.horaInicio}</p>
                  </div>
                  <button className="text-red-600 hover:underline text-sm" onClick={hadleRemove(cita.id)}>
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Citas Pasadas */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Citas Pasadas</h3>
          {pastAppointments.length === 0 ? (
            <p className="text-gray-600">Aún no tienes citas pasadas.</p>
          ) : (
            <ul className="space-y-4">
              {pastAppointments.map((cita) => (
                <li key={cita.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
                  <p className="font-medium">Servicios: {cita.servicios.join(', ')}</p>
                  <p className="text-sm text-gray-600">Fecha: {cita.fecha}</p>
                  <p className="text-sm text-gray-600">Hora: {cita.horaInicio}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
export default ProfilePage;
