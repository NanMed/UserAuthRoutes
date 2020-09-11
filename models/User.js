const knex = require('../database/connection');
const bcrypt = require('bcryptjs');

/*
* Todos los usuarios
*/
exports.all = () => {
  return knex
    .select('*')
    .from('users')
}
/**
 * Encuentra al usuario que tenga el id indicado
 */
exports.findById = (id) => {
  return knex
    .select('*')
    .from('users')
    .where('id', id)
    .first();
}

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
  return knex
    .select('*')
    .from('users')
    .where('email', email)
    .first();
}

exports.create = (user) => {
  let pass = user.password;
  pass = bcrypt.hashSync(pass, 10);
  return knex('users')
    .insert({ name: user.name, email: user.email, password: pass, role: user.role})
}

exports.roleAdmin = (req, res) => {
  findByEmail(req.email)
    .then((data) => {
      let user = data;
      return (user.role === 1);
    });
}

exports.roleUsuario = (req, res) => {
  findByEmail(req.email)
    .then((data) => {
      let user = data;
      return (user.role === 2);
    });
}

exports.roleInvitado = (req, res) => {
  findByEmail(req.email)
    .then((data) => {
      let user = data;
      return (user.role === 3);
    });
}

exports.redirectRoute = (role) => {
  switch (role) {
    case 1:
      return '/app/users'
    case 2:
      return '/app/dashboard'
    default:
      return '/'
  }
}