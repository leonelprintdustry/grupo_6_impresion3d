
const path = require('path'); 

const productModel = require('../models/productos');

const productController = {
    getIndex: (req, res) => {
        const productos = productModel.findAll();

        res.render('index', { title: 'Home', productos});
    },

    getProductCart: (req,res) => {
        res.render('productCart');
    },
    getProductDetail: (req,res) => {
        const id = Number(req.params.id);

        const productAMostrar = productModel.findById(id);

        if (!productAMostrar) {
            return res.send('Error de id');
        }
    
        res.render('productDetail', { product : productAMostrar });
    },

    getProductAdd: (req,res) => {
        const id = Number(req.params.id);
      
        const itemAModificar = productModel.findById(id)
      
        if (!itemAModificar) {
          return res.send('error de id');
        }
      
        res.render('create', { itemAModificar: itemAModificar, title: 'add' });
    },
    // @GET 1. /products (GET)
      getProducts: (req, res) => {
        const productos = productModel.findAll();
        res.render('index', {
            title: 'Productos',
            productos
        });
    },
    getUpdate: (req, res) => {
        const id = Number(req.params.id);
      
        const productoAModificar = productModel.findById(id)
      
        if (!productoAModificar) {
          return res.send('error de id');
        }
      
        res.render('editProduct', { productoAModificar: productoAModificar, title: 'edit' });
    },
    
    getCreate: (req, res) => {
        res.render('create', { title: 'create'});
     },

    deleteProduct: (req, res) => {
        const id = Number(req.params.id);
    
        productModel.deleteById(id);
    
         res.redirect('/products/index');
    
    
    },
   
    updateProduct: (req, res) => {
        const id = Number(req.params.id);
        const nuevosDatos = req.body;

        /*nuevosDatos.name = nuevosDatos.title;
        nuevosDatos.description = nuevosDatos.descripciones;
        nuevosDatos.price = Number(nuevosDatos.precio);
        nuevosDatos.discount = nuevosDatos.descuento;
        datos.image = '/images/productos/' + req.files[0].filename; 
*/
        productModel.updateById(id, nuevosDatos);
        
        res.redirect('/products/index');
    },

    postProduct: (req, res) => {
        let datos = req.body;

        console.log(req.files)

        datos.name = datos.name;
        datos.discount = datos.discount;
        datos.description = datos.description;
        datos.price = Number(datos.price);
        datos.imagen = '/images/productos/' + req.files[0].filename; 
        //datos.imagen = req.files.map(file => '/images/products' + file.filename);

        productModel.createOne(datos);

        //res.redirect('/products/index');
        
    const productos = productModel.findAll();
    res.render('index', { title: 'Productos', productos });
    },

};



module.exports = productController