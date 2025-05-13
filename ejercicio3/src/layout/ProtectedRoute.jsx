import React from 'react'
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <div>Protected Content</div>
      ) : (
        <div>Tienes que iniciar sesión para poder entrar a la página web</div>
      )}
      </div>
  )
}

export default ProtectedRoute