const userModel = require('../models/user');

const rememberMeMiddleware = (req, res, next) => {
  if (req.cookies.email && req.cookies.password) {
    const user = userModel.findByEmail(req.cookies.email);

    if (user && user.password === req.cookies.password) {
      delete user.id;
      delete user.password;

      req.session.user = user;
    }
  }

  next();
};

module.exports = rememberMeMiddleware;