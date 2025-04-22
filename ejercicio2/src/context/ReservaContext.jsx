import { createContext, useState, useContext, useEffect } from 'react';

export const ReservaContext = createContext();

export const ReservaProvider = ({ children }) => {

  const [reserva, setReserva] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

    const getReserva = async () => {
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
            const response = await fetch(`${API_URL}/citas`);
            
            if (!response.ok) {
            throw new Error('Reserva inválida o no encontrada');
            }
            const data = await response.json();
    
            setReserva(data);
        } catch (error) {
            setError(error.message);  // Set error state
            return error.message;
        } finally {
            setLoading(false);
        }
        }
    const setNewReserva = async(reserva) => {
        setLoading(true);
        setError(null);
        try{
            const response = await fetch(`${API_URL}/citas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error al crear la reserva');
            }
            setReserva(data);
        }catch (error) {
            setError(error.message);
            return null;
        }
    }
    const getReservaByUserId = async (usuarioId) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`${API_URL}/citas`);
            if (!response.ok) {
                throw new Error('Reserva inválida o no encontrada');
            }
            const data = await response.json();
            return data.filter((reserva) => reserva.usuarioId === usuarioId); // Filtrar por usuarioId
        } catch (error) {
            setError(error.message); // Set error state
            return []; // Devuelve un array vacío en caso de error
        } finally {
            setLoading(false);
        }
    }
    const removeReserva = async (reservaId) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`${API_URL}/citas/${reservaId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la reserva');
            }
            setReserva((prevReservas) => prevReservas.filter((reserva) => reserva.id !== reservaId));
        } catch (error) {
            setError(error.message); // Set error state
        } finally {
            setLoading(false);
        }
    };
  return (
    <ReservaContext.Provider
      value={{
        getReserva,
        setNewReserva,
        getReservaByUserId,
        removeReserva,
        reserva,
        loading,
        error,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
};

export const useReserva = () => useContext(ReservaContext);