let router = require('express').Router();
let authController = require('../controllers/AuthController');
let authMiddleware = require('../validators/AuthMiddleware');
let homepageController = require('../controllers/HomepageController');

router.get('/users', authMiddleware.roleAdmin, authController.manageUsers);
router.get('/dashboard', authMiddleware.roleUsuario, authController.dashboard);
router.get('/', authMiddleware.roleInvitado, homepageController.index);

module.exports = router;  