const { Usuario } = require('../database/models');

const userApiController = {
  getUsers: async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Obtener el número de página de la consulta
        const perPage = 10; // Número de usuarios por página

         // Calcular el valor de offset para la consulta
      const offset = (page - 1) * perPage;

      const users = await Usuario.findAll({ 
        attributes: ['id', 'nombre', 'email'],
         limit: perPage, // para que muestre solo 10 resultados
         offset, //para desplazar    
    });

      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.nombre,
        email: user.email,
        detail: `/api/users/${user.id}`,
      }));

      const totalCount = await Usuario.count(); // Contar el total de usuarios

      const totalPages = Math.ceil(totalCount / perPage); // Calcular el total de páginas

      const currentPage = parseInt(page, 10);
       const nextPage = currentPage < totalPages ? `/api/users?page=${currentPage + 1}` : null;
       const prevPage = currentPage > 1 ? `/api/users?page=${currentPage - 1}` : null;


       // Construir URLs para la paginación
       const baseUrl = '/api/users'; // Ruta base para los usuarios
       const paginationUrls = {
           prevPage: prevPage,
           nextPage: nextPage,
       };

      res.json({
        count: users.length,
        totalUsers: totalCount,
        totalPages,
        currentPage: page,
        paginationUrls: paginationUrls,
        users: formattedUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios.' });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await Usuario.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

     
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los detalles del usuario.' });
    }
  },
};

module.exports = userApiController;
