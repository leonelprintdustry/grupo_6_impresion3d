const authMiddlewares = {
    allowUnsignedIn: (req, res, next) => {
      if (!req.session.user) {
        return res.redirect('/users/login');
      }
      next();
    },
  
    allowSignedIn: (req, res, next) => {
      if (req.session.user) {
        next();
      } else {
        res.redirect('/users/login');
      }
    }
  };
  
  module.exports = authMiddlewares;