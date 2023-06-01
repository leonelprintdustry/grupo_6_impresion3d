const express = require('express');
const path = require('path'); 

const methodOverride = require('method-override');


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
app.use(express.json());
app.use(methodOverride('_method'));



//app.use('/main', mainRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);


const PORT = process.env.PORT || 3020;
app.listen(PORT,()=>console.log('servidor corriendo en el puerto '+ PORT));


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