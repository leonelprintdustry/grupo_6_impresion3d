import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TotalProductos from './components/TotalProductos';
import TotalCategorias from './components/TotalCategorias';
import TotalUsuarios from './components/TotalUsuarios'; 
import PanelCategorias from './components/PanelCategoria';
import ListadoProductos from './components/ListadoProductos';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Print-Dustry</Link>
            </li>
            <li>
              <Link to="/totalproducts">Productos Totales</Link>
            </li>
            <li>
              <Link to="/totalcategorias">Categorias Totales</Link>
            </li>
            <li>
              <Link to="/totalusuarios">Usuarios Totales</Link> 
            </li>
            <li>
              <Link to="/panelcategorias">Panel de nuestras categorias</Link> 
            </li>
            <li>
              <Link to="/listadoproductos">Listado de Productos</Link> {/* Agrega esta opción */}
            </li>
          </ul>
        </nav>

      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/totalproducts" element={<TotalProductos />} />
          <Route path="/totalcategorias" element={<TotalCategorias />} />
          <Route path="/totalusuarios" element={<TotalUsuarios />} />
          <Route path="/panelcategorias" element={<PanelCategorias />} /> 
          <Route path="/listadoproductos" element={<ListadoProductos />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;


