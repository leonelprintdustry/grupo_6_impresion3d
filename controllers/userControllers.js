let db = require ("../database/models");
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const path = require('path'); 

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
        db.Usuarios.findAll() // Agregue esta parte para la base de datos. 
            .then(function(Usuarios){
                res.render("listadoDeUsuarios", {Usuarios:Usuarios})
            });
        const user = {
            ...req.body
        };
    
        const newPassword = bcrypt.hashSync(user.password, 12);
        user.password = newPassword;
    
        const newConfirmPassword = bcrypt.hashSync(user.controlpassword, 12); // Encriptar la confirmación de contraseña
        user.controlpassword = newConfirmPassword;

        user.imagen = '/images/users/' + req.files[0].filename;
        
    
        userModel.createOne(user);
    
        res.redirect('/products/index');
    },
      

    
    getLogin: (req, res) => {
        const error = req.query.error || '';

        res.render('login', {error});
    },

    loginUser: (req, res) => {
        const searchedUser = userModel.findByEmail(req.body.email);
    
        if (!searchedUser) {
            return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
        }
    
        const { password: hashedPw } = searchedUser;
    
        const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);
    
        if (isCorrect) {
            if (req.body.remember) {
                res.cookie('email', searchedUser.email, {
                    maxAge: 1000 * 60 * 60 * 24 * 30 // Establece una cookie que dura 30 días (30 días * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos)
                });
                res.cookie('password', req.body.password, {
                    maxAge: 1000 * 60 * 60 * 24 * 30 // Establece una cookie que dura 30 días (30 días * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos)
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