import React from 'react';
import ListadoProductos from './ListadoProductos';
import TotalProductos from './TotalProductos';
import TotalUsuarios from './TotalUsuarios';
import PanelCategorias from './PanelCategoria';
import TotalCategorias from './TotalCategorias';

function Home() {
  return (
    <div>
      <TotalUsuarios />
      <TotalProductos />
      <ListadoProductos />
      <TotalCategorias />
      <PanelCategorias />
    </div>
  );
}

export default Home;
