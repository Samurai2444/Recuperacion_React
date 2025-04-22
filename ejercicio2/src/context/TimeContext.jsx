import { createContext, useState, useContext } from 'react';

export const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [time, setTime] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const getTime = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(`${API_URL}/citas`);
        if (!response.ok) {
            throw new Error('Error al obtener las reservas existentes');
        }
        const reservas = await response.json();
        setTime(reservas);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
    }

  const setReservationTime = async (hora, duracionTotal) => {
    setLoading(true);
    setError(null);
    try {
      const horaFin = hora + duracionTotal / 60; // Calcular la hora de finalización
      if (
        (hora >= 9.5 && horaFin <= 14.5) || // Mañana: 9:30 - 14:30
        (hora >= 17.0 && horaFin <= 20.0) // Tarde: 17:00 - 20:00
      ) {
        // Obtener las reservas existentes
        const response = await fetch(`${API_URL}/citas`);
        if (!response.ok) {
          throw new Error('Error al obtener las reservas existentes');
        }
        const reservas = await response.json();

        // Verificar conflictos con las reservas existentes
        const conflicto = reservas.some((reserva) => {
          const reservaInicio = parseFloat(reserva.horaInicio.replace(':', '.'));
          const reservaFin = reservaInicio + reserva.duracionTotal / 60;
          return (
            (hora >= reservaInicio && hora < reservaFin) || // Conflicto al inicio
            (horaFin > reservaInicio && horaFin <= reservaFin) || // Conflicto al final
            (hora <= reservaInicio && horaFin >= reservaFin) // Conflicto completo
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
          body: JSON.stringify({ horaInicio: hora, duracionTotal }),
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
        getTime,
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