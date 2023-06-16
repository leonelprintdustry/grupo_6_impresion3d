const userModel = require('../models/user.js');
const bcrypt = require('bcrypt');

const controllers = {
    signOut: (req, res) => {
        res.clearCookie('email');

        req.session.user = {};

        res.redirect('/products/index');
    },

    getRegister: (req, res) => {
        res.render('register');
    },
    registerUser: (req, res) => {
        const user = {
            ...req.body
        };

        const newPassword = bcrypt.hashSync(user.password, 12);

        user.password = newPassword;

        userModel.createOne(user);

        res.redirect('/products/index');
    },
    getLogin: (req, res) => {
        const error = req.query.error || '';

        res.render('login', {error});
    },

    loginUser: (req, res) => {
     const searchedUser = userModel.findByEmail(req.body.email);
     
     if(!searchedUser){
        return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
     }
        const {password: hashedPw} = searchedUser;

        const isCorrect = bcrypt.compareSync(req.body.password, hashedPw)
        
        //console.log(isCorrect);

        if(isCorrect){
            if(!!req.body.remember){
            res.cookie('email', searchedUser.email, {
                maxAge: 1000 * 60 * 60 * 24 * 360 // eso es un año de cookie, es el maximo, se tiene que ir actualizando para que no tenga fecha de vencimiento
            });
        }
         delete searchedUser.password;
         delete searchedUser.id;

         req.session.user = searchedUser;


         res.redirect('/products/index');
        } else {
        return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
     }

     
    }
}

module.exports= controllers;