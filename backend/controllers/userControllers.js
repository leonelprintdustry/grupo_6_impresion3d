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
        res.render('register', { error: '' });
    },
    registerUser: async (req, res) => {
        const user = {
          ...req.body
        };

        const existingUser = await Usuario.findOne({ where: { email: user.email } });
        if (existingUser) {
            return res.render('register', { error: 'El correo electrónico ya está registrado' });
        }

        if (!user.password || !user.controlpassword) {
            return res.redirect('/users/register?error=Debe ingresar una contraseña y confirmarla');
        }
        const newPassword = bcrypt.hashSync(user.password, 12);
        user.password = newPassword;
    
        const newConfirmPassword = bcrypt.hashSync(user.controlpassword, 12);
        user.controlpassword = newConfirmPassword;
    
        
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
      },
      getEditUser: async (req, res) => {
        try {
          const userId = parseInt(req.params.userId, 10);  // Obtener el ID del usuario a editar
          console.log('UserID:', userId); // Agrega este console.log
          const user = await Usuario.findByPk(userId);
          console.log('User:', user); // Agrega este console.log
        


          if (!user) {
            // Manejar el caso en el que el usuario no se encuentra
            console.log('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado');
          }
      
          console.log('Session User ID:', req.session.user.id); // Agrega este console.log
          console.log('Requested User ID:', userId); // Agrega este console.log
         
          // Verifica si el usuario autenticado es el mismo que está intentando editar
          if (req.session.user.id !== userId) {
            console.log('Session User:', req.session.user);
            console.log('No tiene permiso para editar este usuario');
            return res.status(403).send('No tiene permiso para editar este usuario');
          }

          const userData = req.session.user;
          let error = '';

       
      
          res.render('editUser', { user, userData, error });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
      },
      
    
      postEditUser: async (req, res) => {
        if (!req.session.user) {
          return res.redirect('/users/login'); // Redireccionar al inicio de sesión si no está autenticado
      }
    
      const userId = parseInt(req.params.userId, 10); // Obtener el ID del usuario a editar
      const updatedUserData = req.body; // Obtener los datos actualizados del formulario
  
      // Verificamos si el usuario autenticado es el mismo que está intentando editar
      if (req.session.user.id !== userId) {
          return res.status(403).send('No tiene permisooooooo para editar este usuario');
      }
  
      if (updatedUserData.password) {
        const newPassword = bcrypt.hashSync(updatedUserData.password, 12);
        updatedUserData.password = newPassword;
      }
      
  try {
    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado00000');
    }

    await user.update(updatedUserData);

    res.redirect('/users/login'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidorrr');
  }
},
    
      
    
};

module.exports = controllers;
