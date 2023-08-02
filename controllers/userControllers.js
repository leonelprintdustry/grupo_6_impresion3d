const { Usuario } = require('../database/models');
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
        const user = {
          ...req.body
        };
        if (!user.password || !user.controlpassword) {
            return res.redirect('/users/register?error=Debe ingresar una contraseña y confirmarla');
        }
        const newPassword = bcrypt.hashSync(user.password, 12);
        user.password = newPassword;
    
        const newConfirmPassword = bcrypt.hashSync(user.controlpassword, 12);
        user.controlpassword = newConfirmPassword;
    
        user.imagen = '/images/users/' + req.files[0].filename;
    
        Usuario.create(user)
          .then(() => {
            res.redirect('/products/index');
          })
          .catch(error => {
            console.log(error);
            res.redirect('/users/register');
          });
    },
      
    getLogin: (req, res) => {
        const error = req.query.error || '';
        const searchTerm = req.query.search || ''; 
        res.render('login', {error, searchTerm});
    },

   /* loginUser: (req, res) => {
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
    }*/
    loginUser: async (req, res) => {
        try {
          const { email, password } = req.body;
          const searchedUser = await Usuario.findOne({ where: { email } });
      
          if (!searchedUser) {
            return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
          }
      
          const isCorrect = bcrypt.compareSync(password, searchedUser.password);
      
          if (isCorrect) {
            if (req.body.remember) {
              // Establecer cookies si la opción "recordarme" está seleccionada
              res.cookie('email', searchedUser.email, {
                maxAge: 1000 * 60 * 60 * 24 * 30 // Establece una cookie que dura 30 días (30 días * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos)
              });
              res.cookie('password', req.body.password, {
                maxAge: 1000 * 60 * 60 * 24 * 30 // Establece una cookie que dura 30 días (30 días * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos)
              });
            } else {
              // Borrar cookies si la opción "recordarme" no está seleccionada
              res.clearCookie('email');
              res.clearCookie('password');
            }
      
            delete searchedUser.password;
            delete searchedUser.id;
      
            req.session.user = searchedUser;
      
            return res.redirect('/products/index');
          } else {
            return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
          }
        } catch (error) {
          console.log(error);
          return res.redirect('/users/login?error=Ha ocurrido un error en el servidor');
        }
      }
      
    
};

module.exports = controllers;
