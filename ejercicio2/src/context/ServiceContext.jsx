import { createContext, useState, useContext } from 'react';

export const ServiceContext = createContext();

const API_URL=import.meta.env.VITE_API_URL;

export const ServiceProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state
  const [services, setServices] = useState([])

  const getService = async () => {
    setLoading(true);
    setError(null);  // Clear previous errors
    try {
      const response = await fetch(`${API_URL}/servicios`);

      
      if (!response.ok) {
        throw new Error(data.message || 'Servicios inválidos o no encontrados');
      }
      const data = await response.json();

      setServices(data);
    } catch (error) {
      setError(error.message);  // Set error state
      return error.message;
    } finally {
      setLoading(false);
    }
  };
  const addCart = async (id) => {
    setLoading(true);
    setError(null);  // Clear previous errors
    try {
      const response = await fetch(`${API_URL}/servicios/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(data.message || 'Servicio inválido o no encontrado');
      }
      const data = await response.json();

      setServices(data);
    } catch (error) {
      setError(error.message);  // Set error state
      return error.message;
    } finally {
      setLoading(false);
    }
  }


  return (
    <ServiceContext.Provider value={{ 
      getService, 
      addCart,
      services,
      loading,
      error  // Add error to the context value
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);