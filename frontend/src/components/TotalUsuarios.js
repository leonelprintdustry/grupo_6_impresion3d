import React, { useState, useEffect } from 'react';

function TotalUsuarios() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de usuarios
    fetch('http://localhost:1112/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="total-usuarios">
        <h2>Error al obtener la lista de usuarios</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="total-usuarios">
      <h2>Total de Usuarios</h2>
      <p>NUMERO TOTAL DE USUARIOS EN PRINT-DUSTRY: {totalUsers}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Numero de Usuario: {user.id}</p>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TotalUsuarios;
