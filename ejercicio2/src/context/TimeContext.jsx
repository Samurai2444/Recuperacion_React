import { createContext, useState, useContext } from 'react';

export const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [time, setTime] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const setReservationTime = async (hora, duracionTotal) => {
    setLoading(true);
    setError(null);
    try {
        const horaInicioMinutos = hora * 60; // Convertir hora inicial a minutos
        const duracionMinutos = duracionTotal; // Duración ya está en minutos
        const horaFinMinutos = horaInicioMinutos + duracionMinutos; // Calcular hora de finalización en minutos

        // Definir rangos permitidos en minutos
        const mananaInicio = 9 * 60 + 30; // 9:30 AM en minutos
        const mananaFin = 14 * 60 + 30; // 14:30 PM en minutos
        const tardeInicio = 17 * 60; // 17:00 PM en minutos
        const tardeFin = 20 * 60; // 20:00 PM en minutos

        if (
            (horaInicioMinutos >= mananaInicio && horaFinMinutos <= mananaFin) || // Mañana
            (horaInicioMinutos >= tardeInicio && horaFinMinutos <= tardeFin) // Tarde
        ) {
            // Obtener las reservas existentes
            const response = await fetch(`${API_URL}/citas`);
            if (!response.ok) {
                throw new Error('Error al obtener las reservas existentes');
            }
            const reservas = await response.json();

            // Verificar conflictos con las reservas existentes
            const conflicto = reservas.some((reserva) => {
                const reservaInicioMinutos =
                    parseInt(reserva.horaInicio.split(':')[0]) * 60 +
                    parseInt(reserva.horaInicio.split(':')[1]); // Convertir hora de inicio de la reserva a minutos
                const reservaFinMinutos =
                    reservaInicioMinutos + reserva.duracionTotal;

                return (
                  horaInicioMinutos < reservaFinMinutos &&
                  horaFinMinutos > reservaInicioMinutos
                );
            });

            if (conflicto) {
                throw new Error(
                    'El horario solicitado entra en conflicto con otra reserva, por favor elige otro horario'
                );
            }

            // Si no hay conflictos, actualizar la reserva
            const patchResponse = await fetch(`${API_URL}/citas`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    horaInicio: `${Math.floor(horaInicioMinutos / 60)
                        .toString()
                        .padStart(2, '0')}:${(horaInicioMinutos % 60)
                        .toString()
                        .padStart(2, '0')}`,
                    duracionTotal,
                }),
            });

            if (!patchResponse.ok) {
                throw new Error('Error al actualizar la reserva');
            }

            const data = await patchResponse.json();
            setTime(data);
        } else {
            throw new Error(
                'La hora no está dentro del rango permitido (9:30-14:30 o 17:00-20:00)'
            );
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <TimeContext.Provider
      value={{
        setReservationTime,
        loading,
        error,
        time,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext);