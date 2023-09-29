const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");
const {registerSchema , loginSchema  } = require('../schema/auth.schema')
const { validateSchema} = require('../middlewares/validator.middlewares');

router.post('/register' ,validateSchema(registerSchema), usuarioController.register);
router.post('/login' , validateSchema(loginSchema),usuarioController.login);
router.post('/logout' , usuarioController.logout);
router.get('/verify', usuarioController.verifyToken);

/*
router.put('/profile/:id', usuarioController.EditarPerfil);
*/


module.exports = router;