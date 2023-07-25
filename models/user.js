const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// let nextId = 1;     esto es por si se quiere guardar el id, en formato numero continuo, sigo usando uuid.v4 para tener ids unicos a nivel global
const model = {
 // Ruta del archivo JSON
 route: '../data/users.json',

 // Traer todos los usuarios
 findAll: function () {
     const usersJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

     const users = JSON.parse(usersJSON);

     return users;
 },

 // Traer un usuario según su ID
 findByEmail: function (email) {
     const users = this.findAll();

     let searched = users.find(user => user.email === email);

     if (!searched) {
         searched = null;
     }

     return searched;
 },

 // Eliminar un usuario
 deleteById: function (id) {
     let users = this.findAll();

     users = users.filter(product => product.id !== id);

     const usersJSON = JSON.stringify(users);

     fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

     return users;
 },

 // Editar un usuario
 updateById: function (id, newData) {
     // Buscamos el array de usuarios
     let users = this.findAll();

     // Con el findIndex, buscamos en qué indice del array de usuarios, está guardado el elemento buscado
     const indice = users.findIndex(usuarioActual => usuarioActual.id === id);

     // Actualizamos los datos del usuario que corresponda, con los datos que nos pasaron por parámetros
     users[indice].title = newData.title;
     users[indice].price = newData.price;

     // Convertimos nuestro array de JS a un array de JSON
     const usersJSON = JSON.stringify(users);

     // Guardamos este nuevo array de JSON en el archivo correspondiente
     fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

     return users;
 },

 // Agregar un usuario nuevo
 createOne: function (newUser) {
     // Buscamos todos los usuarios
     let users = this.findAll();

     // Le damos el ID al usuario nuevo
     //newUser.id = uuid.v4();

    // por si necesitamos caambiar el formato de id como se esta guardando en uuid.v4
    //newUser.id = nextId++
     // tambien funciona esta opcion
     newUser.id = users[users.length - 1].id + 1;

     // Agregamos el usuario nuevo al array original
     users.push(newUser);

     // Convertimos a JSON el array
     const usersJSON = JSON.stringify(users);

     // Sobreescribimos el JSON
     fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
 }
}
module.exports = model;