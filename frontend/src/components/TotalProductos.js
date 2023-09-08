import React, { useState, useEffect } from 'react';

function TotalProductos() {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener el total de productos
    fetch('http://localhost:1112/api2/products/total')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json();
      })
      .then((data) => {
        // Extrae el valor 'total' del objeto de respuesta
        const { total } = data;
        setTotal(total); // Actualiza el estado con el total de productos
      })
      .catch((error) => {
        console.error('Error al obtener el total de productos', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="total-productos">
        <h2>Error al obtener el total de productos</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="total-productos">
      <h2>Total de Productos</h2>
      <p>Numeros de productos activos en Print-Dustry: {total}</p>
    </div>
  );
}

export default TotalProductos;   


