import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

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
       
    <div className="panel-categorias">
      <h2>Categorías</h2>
      <ul>
        {categorias.map((categoria) => (
          <h4 key={categoria}>{categoria}</h4>
        ))}
      </ul>
    </div>
    </section>
    </div>
  );
}

export default PanelCategorias;
