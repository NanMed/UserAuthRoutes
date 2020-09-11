exports.esUsuario = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/register');
    }
}
  
exports.roleAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role === 1){
      next();
    } else {
      res.status(403).json({msg: 'Error 403 – Forbidden'});
    }
}
  
exports.roleUsuario = (req, res, next) => {
    if(req.isAuthenticated() && (req.user.role === 2 || req.user.role === 1)){
      next();
    } else {
      res.status(403).json({msg: 'Error 403 – Forbidden'});
    }
}

exports.roleInvitado = (req, res, next) => {
  if(req.isAuthenticated() && req.user.role === 3){
    next();
  } else {
    res.status(403).json({msg: 'Error 403 – Forbidden'});
  }
}