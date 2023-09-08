import React, { useState, useEffect } from 'react';

function ListadoProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de productos
    fetch('http://localhost:1112/api2/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json();
      })
      .then((data) => {
        // Verifica si la respuesta contiene la lista de productos
        if (data && data.products) {
          setProductos(data.products);
        } else {
          throw new Error('Respuesta de API no válida');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="listado-productos">
        <h2>Error al obtener la lista de productos</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="listado-productos">
      <h2>Listado de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Color</th>
          
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.description}</td>
              <td>{producto.category}</td>
              <td>{producto.color}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoProductos;

