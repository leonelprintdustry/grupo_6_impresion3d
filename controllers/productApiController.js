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
          // Agregar relaciones de uno a muchos aquí si es necesario (colors, sizes, etc.)
        ]
      });

      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }

      // Agrega la URL de la imagen del producto si es necesario
      producto.dataValues.image_url = `/api/products/${productId}/image`;

      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los detalles del producto.' });
    }
  }
};

module.exports = productApiController;
