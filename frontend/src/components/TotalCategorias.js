import React, { useState, useEffect } from 'react';

function TotalCategorias() {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:1112/api2/categorias/total')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json();
      })
      .then((data) => {
        // Verifica que data sea un objeto con la propiedad 'total' antes de asignarla a 'total'
        if (data && data.total !== undefined) {
          setTotal(data.total);
        } else {
          throw new Error('Respuesta de API no válida');
        }
      })
      .catch((error) => {
        console.error('Error al obtener el total de categorías', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="total-categorias">
        <h2>Error al obtener el total de categorías</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="total-categorias">
    <h2>Total de Categorías</h2>
    <p>Número total de categorías en prindustry: {total}</p>
   
  </div>
  );
}

export default TotalCategorias;





