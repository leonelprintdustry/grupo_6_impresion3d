const path = require('path'); 
const expressValidator = require('express-validator');


const productModel = require('../models/productos');

const productController = {
    getIntro: (req, res) => {
        res.render('intro', {title: 'Print-Dustry'});
       },
    getIndex: (req, res) => {
        const productos = productModel.findAll();
        const userData = req.session.user;
        res.render('index', { title: 'Home', productos, userData: userData});
    },

    getProductCart: (req,res) => {
        res.render('productCart');
    },
    getProductDetail: (req,res) => {
        const id = Number(req.params.id);

        db.Productos.findAll() // Agregue esta parte para la Base de dayos 
            .then(function(Productos){
                res.render("listadoDeUsuarios", {Productos:Productos}) 
            });

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
        res.render('create', { title: 'create', errors: [], values: {} });
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
        nuevosDatos.imagen = '/images/productos/' + req.files[0].filename; 
        */
        /*if (req.files && req.files.length > 0) {
        nuevosDatos.imagen = '/images/productos/' + req.files[0].filename;
        }*/

        productModel.updateById(id, nuevosDatos);
        
        res.redirect('/products/index' );
    },

    postProduct: (req, res) => {
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
    
        productModel.createOne(datos);
    
        const productos = productModel.findAll();
        const userData = req.session.user; 
        res.render('index', { title: 'Productos', productos, errors: validation.errors, values: req.body, userData}); 
    },
};
    



module.exports = productController