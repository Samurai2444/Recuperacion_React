import { createContext, useState, useContext, useEffect } from 'react';
import bcrypt from "bcryptjs";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: hashedPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar el usuario');
      }

      return data; // Devuelve los datos del registro
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (username, password) => {
    setLoading(true);
    setError(null); 
    
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      
      const data = await response.json();
      if(data.length>0){
        data.map((item) => {
          const passwordMatch = bcrypt.compareSync(password, item.password);
            if(passwordMatch){
            // Si la contraseña coincide, se guarda el token en el localStorage
            localStorage.setItem('token', item.token);
            setToken(item.token);
            setIsAuthenticated(true);
          }
        });
      }
      if (!response.ok) {
        throw new Error(data.message || 'Credenciales inválidas');
      }
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        token,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);