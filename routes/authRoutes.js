const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Impor middleware autentikasi

router.post('/register', authController.register);

router.post('/registerAslab', authController.registerAslab);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/user', authMiddleware, authController.getUserByToken); 

module.exports = router;
