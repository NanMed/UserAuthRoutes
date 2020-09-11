let router = require('express').Router();
let homepageController = require('../controllers/HomepageController');
let authController = require('../controllers/AuthController');
let authValidator = require('../validators/AuthValidators');
let passport = require('passport');
let UserModel = require('../models/User');

router.get('/', homepageController.index);

// Authentication routes
router.get('/login', authController.login);
router.get('/register', authController.register);

router.post('/register', authValidator.store, authController.store);
//router.post('/login', passport.authenticate('local', { failureRedirect: '/login-fail', successRedirect: '/protected' }));

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login-fail'}),
  async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findByEmail(email)
    res.redirect(UserModel.redirectRoute(user.role));
  }
);

router.get('/protected', (req, res) => {
  res.send('Usuario logueado con éxito');
});
router.get('/login-fail', (req, res) => {
  res.send('El usuario no tiene una sesión válida');
});

module.exports = router;
