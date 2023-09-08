import React, { useState, useEffect } from 'react';

function PanelCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener las categorías
    fetch('http://localhost:1112/api2/categorias')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json();
      })
      .then((data) => {
        // Verifica si la respuesta contiene el campo 'categorias'
        if (data && data.categorias) {
          setCategorias(data.categorias);
        } else {
          throw new Error('Respuesta de API no válida');
        }
      })
      .catch((error) => {
        console.error('Error al obtener las categorías', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="panel-categorias">
        <h2>Error al obtener las categorías</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="panel-categorias">
      <h2>Categorías</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>{categoria}</li>
        ))}
      </ul>
    </div>
  );
}

export default PanelCategorias;
