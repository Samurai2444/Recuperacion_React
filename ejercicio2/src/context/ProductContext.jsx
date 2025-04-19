import { createContext, useState, useContext } from 'react';

export const ProductContext = createContext();

const API_URL=import.meta.env.VITE_API_URL;

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state
  const [products, setProducts] = useState([])

  const getProduct = async () => {
    setLoading(true);
    setError(null);  // Clear previous errors
    try {
      const response = await fetch(`${API_URL}/productos`);

      
      if (!response.ok) {
        throw new Error(data.message || 'Productos inválidos o no encontrados');
      }
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      setError(error.message);  // Set error state
      return error.message;
    } finally {
      setLoading(false);
    }
  };


  return (
    <ProductContext.Provider value={{ 
      getProduct, 
      products,
      loading,
      error  // Add error to the context value
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);