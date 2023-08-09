const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const { Usuario, Producto, Categoria, Color, Material, Carrito } = require('./database/models');
const rememberMeMiddleware = require('./middlewares/rememberMe');
///const mainRouter = require('./routes/main')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users'); // Ruta donde se guardarán las imágenes de usuarios
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


const productRouter = require('./routes/productos');
const userRouter = require('./routes/userRoutes');
const app = express();


app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/users'),
 
]);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(expressSession({ secret: 'este es mi secreto secretito secretoso'}));
app.use(rememberMeMiddleware);

app.use((req, res, next) => {
    const ruta = req.originalUrl + '\n';
    fs.appendFileSync(path.join(__dirname, './data/rutas.txt'), ruta);
    next();
});

app.use((req, res, next) => {
    if(req.cookies.email && req.cookies.password) {
        const userModel = require('./models/user');

        const user = userModel.findByEmail(req.cookies.email);

        if (user && user.password === req.cookies.password) {
        console.log(user);
        delete user.id;
        delete user.password;

        req.session.user = user;
    }
}

    next();
})

app.get('/prueba', async (req, res) => {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts'

    const response = await axios.get(endpoint);


    res.render('posts', { posteos: response.data });

});




//app.use('/main', mainRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);




app.listen(1112 ,() => {
console.log('servidor corriendo en el puerto http://localhost:1112/products/intro')
});
