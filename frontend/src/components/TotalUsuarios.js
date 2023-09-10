import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './style.css'
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
    <div>
     <section className="sidebar">
        <Link to="/" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">Print-Dustry</span>
        </Link>
        <ul className="side-menu top">
          <li className="active">
            <Link to="/">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Todo</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Panel Categorias</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="bx bxs-group"></i>
              <span className="text">Ultimos Productos</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="/" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Cerrar Sesion</span>
            </Link>
          </li>
        </ul>
      </section>
     
      <section className="content">
    <div className="total-usuarios">
      <h2>Total de Usuarios</h2>
      <p>NUMERO TOTAL DE USUARIOS EN PRINT-DUSTRY: {totalUsers}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h4>Numero de Usuario: {user.id}</h4>
            <h4>Nombre: {user.name}</h4>
            <h4>Email: {user.email}</h4>
          </li>
        ))}
      </ul>
    </div>
    </section>
    </div>

        );
}

export default TotalUsuarios;
