import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TotalProductos from './components/TotalProductos';
import TotalCategorias from './components/TotalCategorias';
import TotalUsuarios from './components/TotalUsuarios'; 
import PanelCategorias from './components/PanelCategoria';
import ListadoProductos from './components/ListadoProductos';
import DetalleUltimoProducto from './components/DetalleUltimoProducto';
import Home from './components/Home';
import './components/style.css';

function App() {
  return (
    <Router>
      <div>
        
      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/totalproducts" element={<TotalProductos />} />
          <Route path="/totalcategorias" element={<TotalCategorias />} />
          <Route path="/totalusuarios" element={<TotalUsuarios />} />
          <Route path="/panelcategorias" element={<PanelCategorias />} /> 
          <Route path="/listadoproductos" element={<ListadoProductos />} /> 
          <Route path="/detalleultimoproducto" element={<DetalleUltimoProducto />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;


