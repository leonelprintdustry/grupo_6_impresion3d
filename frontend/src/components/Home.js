import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import ListadoProductos from './ListadoProductos';
import TotalProductos from './TotalProductos';
import TotalUsuarios from './TotalUsuarios';
import PanelCategorias from './PanelCategoria';
import TotalCategorias from './TotalCategorias';
import DetalleUltimoProducto from './DetalleUltimoProducto';

function Home() {
  
  return (
    <div className='body'>
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
            <Link to="#" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Cerrar Sesion</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className="content">
        <nav>
          <i className='bx bx-menu' ></i>
          <Link to='http://localhost:1112/products/intro' className="nav-link">Print-Dustry</Link>
         
          <Link to="/" className="notification">
            <i className='bx bxs-bell' ></i>
            <span className="num">13</span>
          </Link>
         
			
        </nav>
        <main>
        <div className="head-title">
      <div className="left">
        <h1>Dashboard Print-Dustry</h1>
        <ul className="breadcrumb">
          <li>
            <Link to="#">Dashboard</Link>
          </li>
          <li>
            <i className='bx bx-chevron-right'></i>
          </li>
        
        </ul>
      </div>
      <Link to="#" className="btn-download">
        <i className='bx bxs-cloud-download'></i>
        <span className="text">Descarga PDF Base de datos</span>
      </Link>
    </div>
  
      <div>
        <ul className='box-info'>
          <li>
            <i className='bx bxs-group'></i>
            <span className="text">
              <h3><TotalCategorias /></h3>
            </span>
          </li>
          <li>
            <i className='bx bxs-dollar-circle'></i>
            <span className="text">
              <h3><TotalProductos /></h3>
            </span>
          </li>   
        </ul>
        <div className='table-data'>
        <div className='todo'>
          <div className='head'>
          <h3>Detalle Ultimo Producto</h3>
						<i className='bx bx-plus' ></i>
						<i className='bx bx-filter' ></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
            <DetalleUltimoProducto />
            </li>
          </ul>
        </div>
        </div>
        <div className='table-data'>
        <div className='todo'>
          <div className='head'>
          <h3>Panel Categorias</h3>
						<i className='bx bx-plus' ></i>
						<i className='bx bx-filter' ></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
            <PanelCategorias />
            </li>
          </ul>
        </div>
        </div>
        <div className='table-data'>
        <div className='todo'>
          <div className='head'>
          <h3>Listado de Productos</h3>
						<i className='bx bx-plus' ></i>
						<i className='bx bx-filter' ></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
            <ListadoProductos />
            </li>
          </ul>
        </div>
        </div>
        <div className='table-data'>
        <div className='todo'>
          <div className='head'>
          <h3>Usuarios</h3>
						<i className='bx bx-plus' ></i>
						<i className='bx bx-filter' ></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
            <TotalUsuarios />
            </li>
          </ul>
        </div>
        </div>
     
      </div>

      </main>
      </section>
    </div>
  );
}

export default Home;

