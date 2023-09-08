const { Usuario } = require('../database/models');
const bcrypt = require('bcrypt');

const controllers = {
    create: async (req, res) => {
        const nuevoUsuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: req.body.password,
            edad: req.body.edad
        };
        const newPassword = bcrypt.hashSync(user.password, 12);

        user.password = newPassword;

        try {
            const datos = await Usuario.create(nuevoUsuario);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }

        res.send('Se ha registrado con exito');
    },

    listForm: async (req, res) => {
        try {
            const usuarios = await Usuarios.findAll({
                raw: true,
                include: 'club',
                //include: ['club', 'seleccion'],
                nest: true
            });

           
            res.render('usuariosList', { usuarios });
        } catch (error) {
            res.render('usuariosList', { usuarios: [] });
            console.log(error);
        }
    },

    updatePlayer: async (req, res) => {
        console.log(req.body);

        const newValues = req.body;

        try {
            await Usuario.update(newValues, {
                where: {
                    id: req.body.id
                }
            });
            
            res.redirect('/usuarios');

        } catch (error) {
            res.send('No se pudo actualizar!')
            console.log(error);
        }
    },


    getUpdate: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);

            res.render('updateUsuario', { usuario })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = controllers;