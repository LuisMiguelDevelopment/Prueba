const express = require('express');
const router = express.Router();
const compraController = require("../controllers/compraController")

router.get('/',compraController.getCompra);
router.post('/',compraController.addAlaCompra);

module.exports = router;