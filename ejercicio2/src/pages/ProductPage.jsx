import React, { useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { products, getProduct, loading, error } = useProduct();
  const navigate= useNavigate();

  // Llamar a getProduct al montar el componente
  useEffect(() => {
    getProduct();
  }, []);

  const hadleBack = () => {
    navigate('/'); // Redirigir a la página de inicio
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
        {products.map((product) => (
          <div
            key={product.id} // id del producto
            className="bg-white rounded-xl p-6 hover:shadow-sm"
          >
            <div className="relative group">
              <h2 className="text-xl font-bold text-center mt-4">
                {product.nombre}
              </h2>
              <p>{product.marca}</p>
              <p>{product.descripcion}</p>
              <p>{product.precio} €</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={hadleBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Volver al Inicio
      </button>
    </div>
  );
};

export default ProductPage;