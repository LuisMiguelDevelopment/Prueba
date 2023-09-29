const express = require('express');
const router = express.Router();
const productoController = require("../controllers/productosController")


router.post('/productos',productoController.crearProducto)
router.get('/productos',productoController.obtenerProductos)


module.exports = router;