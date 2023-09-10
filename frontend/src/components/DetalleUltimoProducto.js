import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import './style.css'
const DetalleUltimoProducto = () => {
  const [ultimoProducto, setUltimoProducto] = useState(null);

  useEffect(() => {
    fetch('http://localhost:1112/api2/products/ultimo')
      .then((response) => response.json())
      .then((data) => {
        setUltimoProducto(data);
      })
      .catch((error) => {
        console.error('Error al obtener el último producto:', error);
      });
  }, []);

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
        {ultimoProducto ? (
          <div>
            <h4>{ultimoProducto.nombre}</h4>
            <p>Descripción: {ultimoProducto.descripcion}</p>
            <p>Precio: {ultimoProducto.precio}</p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
           
        
      </section>
    </div>
  );
};

export default DetalleUltimoProducto;

