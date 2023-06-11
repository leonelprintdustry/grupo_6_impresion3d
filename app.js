const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

//const mainRouter = require('./routes/main')
const productRouter = require('./routes/productos')
const authRouter = require('./routes/auth')

const app = express();


app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, './views/users'),
    path.join(__dirname, './views/products')
]);


app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Mueve esta línea antes del middleware de registro de rutas
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(expressSession({
    secret: 'este es mi secreto secretito secretoso',
    resave: true, 
    saveUninitialized: true 
}));

// Mueve este middleware después de express.json()
app.use((req, res, next) => {
    const ruta = req.originalUrl + '\n';
    fs.appendFileSync(path.join(__dirname, './data/rutas.txt'), ruta);
    next();
});


app.use((req, res, next) => {
    if(req.body.email){
        const userModel = require('./models/user');

        const user = userModel.findByEmail(req.body.email);
        console.log(user);
        delete user.id;
        delete user.password;

        req.session.user = user;
    }

    next();
})


//app.use('/main', mainRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);



app.listen(1112 ,() => {
console.log('servidor corriendo en el puerto http://localhost:1112')
});

/*

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/views/index.html'));
});

app.get('/productDetail', (req,res) => {
    res.sendFile(path.join(__dirname,'/views/productDetail.html'));
}); 

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname,'/views/register.html'));
});

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,'/views/login.html'));
}); 
*/