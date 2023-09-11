
const { Producto, Categoria, Color, Material, Carrito, Usuario, ProductosCarritoDeCompras } = require('../database/models');
const { check, validationResult } = require('express-validator');
//const { obtenerProductosEnCarritoDelUsuario } = require('../database/models/Carrito');
const sequelize = require('../database/config/database.json');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');



const productController = {
    getIntro: (req, res) => {
        res.render('intro', { title: 'Print-Dustry' });
    },

    getIndex: async (req, res) => {
        //try {
           /* const productos = await Producto.findAll();
            const userData = req.session.user;
            res.render('index', { title: 'Home', productos, userData: userData });*/
       // } catch (error) {
           // console.error(error);
            //res.status(500).send('Error al obtener los productos');

       // }
       try {
        const productos = await Producto.findAll({
          where: { activo: true }, // Filtrar solo productos activos
        });
        const userData = req.session.user;

        
        

        res.render('index', { title: 'Home', productos, userData: userData});
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    },
    eliminarDelCarrito: async (req, res) => {
        try {
            const carritoId = Number(req.params.id); // Obtén el ID del carrito a eliminar
        
            // Busca los registros en productos_carrito_de_compras relacionados con el carrito
            const productosEnCarrito = await ProductosCarritoDeCompras.findAll({
              where: {
                carrito_de_compras_id: carritoId
              }
            });
        
            // Elimina los registros en productos_carrito_de_comprassssssssssssssssssssss
            //asaksak
            await Promise.all(productosEnCarrito.map(async (producto) => {
              await producto.destroy();
            }));
        
            // Luego, elimina el registro en carrito_de_compras
            const carrito = await Carrito.findOne({
              where: {
                id: carritoId,
                usuario_id: req.session.user.id // Verifica que el usuario actual sea el propietario del carrito
              }
            });
        
            if (!carrito) {
              // Si el carrito no existe, muestra un mensaje de error
              res.status(404).send('Carrito no encontrado.');
              return;
            }
        
            // Elimina el registro en carrito_de_compras
            await carrito.destroy();
        
            // Redirige al usuario a la página del carrito después de eliminar con éxito
            res.redirect('/products/productCart');
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar producto del carrito');
          }
          },
    calculateTotalPrice: (productsInCart) => {
        let total = 0;
        productsInCart.forEach(product => {
            total += parseFloat(product.producto.precio);
        });
        return total.toFixed(2); //redondear a 2 decimalels
    },

    getProductCart: async (req, res) => {
        try {
            // obtener los productos en el carrito del usuario desde la base de datos
            const userId = req.session.user.id;
            const productsInCart = await Carrito.obtenerProductosEnCarritoDelUsuario(userId);
            const userData = req.session.user; // obtenego los datos del usuario desde la sesión
            
            // Calcular el precio total de los productos en el carrito
            const totalPrecio = productController.calculateTotalPrice(productsInCart);
            
            res.render('productCart', { productsInCart, userData, totalPrecio });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos en el carritoooooooo');
        }
    },


    getProductDetail: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const productAMostrar = await Producto.findByPk(id);

            if (!productAMostrar) {
                return res.send('Error de id');
            }

            const colores = await Color.findAll(); 
            const materiales = await Material.findAll(); 
            const categorias = await Categoria.findAll(); 
            const userData = req.session.user; 

            res.render('productDetail', { product: productAMostrar, colores, materiales, categorias, userData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener el detalle del producto');
        }
    },
   
    
    
    

    getUpdate: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const productoAModificar = await Producto.findByPk(id);
  
        if (!productoAModificar) {
          return res.send('Error de id');
        }
   
        const categorias = await Categoria.findAll();
        const colores = await Color.findAll();
        const materiales = await Material.findAll();

        res.render('editProduct', { productoAModificar: productoAModificar, title: 'edit', categorias, colores, materiales });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el producto para modificar');
      }
    },
    getCreate: async (req, res) => {
            try {
              // Obtener las listas de categorías y colores desde la base de datos
              const categorias = await Categoria.findAll();
              const colores = await Color.findAll();
              const materiales = await Material.findAll();
        
              res.render('create', { title: 'create', errors: [], values: {}, categorias, colores, materiales });
            } catch (error) {
              console.error(error);
              res.status(500).send('Error al obtener los datos para el formulario de creación');
            }
        },
    deleteProduct: async (req, res) => {
        /*tr {
            const id = Number(req.params.id);
            await Producto.destroy({
                where: { id }
            });
            res.redirect('/products/index');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar el producto');
        }*/
        try {
          const id = Number(req.params.id);
  
          // Realizar una consulta directa para actualizar el campo 'activo'
          await Producto.update(
              { activo: 0 },
              { where: { id } }
          );
  
          res.redirect('/products/index');
      } catch (error) {
          console.error(error);
          res.status(500).send('Error al cambiar el estado del producto a inactivo');
      }
    
        },

    updateProduct: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const nuevosDatos = req.body;
            const userId = req.session.user.id;

            if (req.files && req.files.length > 0) {
                nuevosDatos.imagen = '/images/productos/' + req.files[0].filename;
            }

            nuevosDatos.nombre_color = req.body.nombre_color;
            nuevosDatos.usuario_id = userId;

            await Producto.update(nuevosDatos, {
                where: { id }
            });

            res.redirect('/products/index');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar el producto');
        }
    },

    postProduct: async (req, res) => {
       /* try {
            const validation = expressValidator.validationResult(req);

            if (validation.errors.length > 0) {
                const userData = req.session.user;
                return res.render('create', { errors: validation.errors, values: req.body, userData });
            }

            let datos = req.body;
            datos.name = datos.name;
            datos.discount = datos.discount;
            datos.description = datos.description;
            datos.price = Number(datos.price);
            datos.imagen = '/images/productos/' + req.files[0].filename;

            await Producto.create(datos);

            const productos = await Producto.findAll();
            const userData = req.session.user;
            res.render('index', { title: 'Productos', productos, errors: validation.errors, values: req.body, userData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el producto');
        }*/
        try {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
              const userData = req.session.user;
             // Obtener las listas de categorías y colores desde la base de datos
              const categorias = await Categoria.findAll();
              const colores = await Color.findAll();
              const materiales = await Material.findAll();
      
              return res.render('create', { errors: validation.array(), values: req.body, userData, categorias, colores, materiales });
            }
      
            let datos = req.body;
            datos.name = datos.nombre;
            datos.discount = datos.discount;
            datos.description = datos.description;
            datos.price = Number(datos.precio);
            datos.imagen = '/images/productos/' + req.files[0].filename;
            datos.usuario_id = userId;


            // Buscar el id de la categoría y el color basado en las palabras recibidas
            const categoria = await Categoria.findOne({ where: { nombre: datos.nombre_categoria } });
            const color = await Color.findOne({ where: { nombre: datos.nombre_color } });
            const material = await Material.findOne({ where: { nombre: datos.nombre_material } });
      
            if (!categoria || !color || !material) {
              return res.status(400).send('Categoría ,color o Material inválido.');
            }
      
            datos.id_categoria = categoria.id;
            datos.id_color = color.id;
            datos.id_material = material.id;
      
            // Crear el producto con los datos actualizados
            await Producto.create(datos);
      
            const productos = await Producto.findAll();
            const userData = req.session.user;
            res.render('index', { title: 'Productos', productos, errors: validation.errors, values: req.body, userData, userId });
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el producto');
          }
        },
      
         
      addToCart: async (req, res) => {
        try {
            const productId = Number(req.params.id); // Obtén el ID del producto del formulario
            const userId = req.session.user.id;
        // Busca el producto por su ID
        const product = await Producto.findByPk(productId);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Calcula el precio total y la cantidad 
        const cantidad = 1;
        const precioTotal = product.precio * cantidad;

        // Crea un nuevo registro en la tabla del carrito
        const nuevoCarrito = await Carrito.create({
            cantidad,
            precio_total: precioTotal,
            usuario_id: userId,
            producto_id: productId
        });

        res.redirect('/products/index');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el producto al carrito');
    }
},



   /* getProducts: async (req, res) => {
        try {
            const searchTerm = req.query.q; // Obtener el término de búsqueda de la barra de búsqueda

            // Si no se ingresó ningún término de búsqueda, simplemente muestra todos los productos
            if (!searchTerm) {
                const productos = await Producto.findAll();
                return res.render('index', {
                    title: 'Productos',
                    productos
                });
            }

            // Si se ingresó un término de búsqueda, realiza la búsqueda utilizando el término
            //const productos = await Producto.findAll({
              //  where: {
                //    name: {
                  //      $like: `%${searchTerm}%`
                    //}
                //}
            //});

            res.render('index', {
                title: 'Productos',
                productos,
                searchTerm // Pasar el término de búsqueda para mostrarlo nuevamente en la barra de búsqueda
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },*/
    getProductBySearch: async (req, res) => {
        try {
            const searchTerm = req.query.q; // Obtén el término de búsqueda del parámetro de consulta
    
            if (!searchTerm) {
                return res.redirect('/products/index'); // Redirige a la página principal de productos si no se proporciona un término de búsqueda
            }
    
            const productos = await Producto.findAll({
                where: {
                    nombre: {
                        [Op.like]: `%${searchTerm}%`,
                    
                    },
                    activo: true
                }
            });
    
            const userData = req.session.user;
            res.render('searchResults', {
                title: 'Resultados de busqueda',
                productos,
                searchTerm,
                userData
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al buscar los productos');
        }
    },


    
    
 
    

};

module.exports = productController; 