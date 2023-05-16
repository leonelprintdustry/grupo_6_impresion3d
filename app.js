const express = require('express');

const path = require('path'); 

const app = express();

const mainRouter = require('./routes/main')

const productRouter = require('./routes/productos')

const authRouter = require('./routes/auth')

const PORT = process.env.PORT || 3020;

app.use(express.static('public'))

app.listen(PORT,()=>console.log('servidor corriendo en el puerto'+PORT));

app.use('/main', mainRouter);

app.use('/products', productRouter);

app.use('/auth', authRouter);

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