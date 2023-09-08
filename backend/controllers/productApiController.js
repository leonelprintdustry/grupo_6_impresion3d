const { Producto, Categoria, Color } = require('../database/models');

const productApiController = {
    getProducts: async (req, res) => {
        try {
          const page = req.query.page || 1; // Página actual, por defecto es la 1
          const limit = 10; // Cantidad de resultados por página
          const offset = (page - 1) * limit;
    
          const productos = await Producto.findAll({
            attributes: ['id', 'nombre', 'descripcion'],
            include: [
              {
                model: Categoria,
                as: 'categoria',
                attributes: ['nombre']
              },
              {
                model: Color,
                as: 'color',
                attributes: ['nombre'] // Especifica las columnas que deseas incluir de la tabla de Color
              }
            ],
            where: { activo: true },
            limit,
            offset // Aplicar el offset según la página actual
          });
    
          // Calcular la cantidad total de productos
          const count = productos.length;
    
          // Obtener la cantidad total de páginas
          const totalPages = Math.ceil(count / limit);
    
        
      // Agrupar productos por categoría y color
      const countByCategoryAndColor = {};
      productos.forEach(producto => {
        const categoria = producto.categoria.nombre;
        const color = producto.color.nombre; // Reemplaza 'nombre' con el nombre real de la columna de color

        if (!countByCategoryAndColor[categoria]) {
          countByCategoryAndColor[categoria] = {};
        }

        if (!countByCategoryAndColor[categoria][color]) {
          countByCategoryAndColor[categoria][color] = 1;
        } else {
          countByCategoryAndColor[categoria][color]++;
        }
      });
    
          // Formatear la respuesta
          const formattedProducts = productos.map(producto => ({
            id: producto.id,
            name: producto.nombre,
            description: producto.descripcion,
            category: producto.categoria.nombre,
            color: producto.color.nombre,
            detail: `/api/products/${producto.id}`
          }));
    
          const nextPage = page < totalPages ? `/api2/products/?page=${page + 1}` : null;
          const prevPage = page > 1 ? `/api2/products/?page=${page - 1}` : null;
    
          res.json({
            count,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage,
            countByCategoryAndColor,
            products: formattedProducts
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener la lista de productos.' });
        }
      },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const producto = await Producto.findByPk(productId, {
        attributes: { exclude: ['activo'] },
        include: [
       ]
      });

      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }

      producto.dataValues.image_url = `/api/products/${productId}/image`;

      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los detalles del producto.' });
    }
  },
  getTotalProducts: async (req, res) => {
    try {
      const total = await Producto.count({ where: { activo: true } });
      res.json({ total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el total de productos.' });
    }
  },
  getTotalCategorias: async (req, res) => {
    try {
      const total = await Categoria.count(); 
      res.json({ total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el total de categorías.' });
    }
  },
  getCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll({
        attributes: ['nombre'], // Solo seleccionar el atributo 'nombre'
      });

      const nombresCategorias = categorias.map((categoria) => categoria.nombre);

      res.json({ categorias: nombresCategorias });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de categorías.' });
    }
  },
  getUltimoProducto: async (req, res) => {
    try {
      const ultimoProducto = await Producto.findOne({
        order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente para obtener el último producto
      });
  
      if (!ultimoProducto) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
  
      res.json(ultimoProducto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el último producto.' });
    }
  },
  



};

module.exports = productApiController;
