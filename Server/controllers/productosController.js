const Producto = require("../models/Productos");
const upload = require('../config/multer-config.js');


exports.crearProducto = async (req, res) => {
    try {
    
        upload.single('imagen')(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al cargar la imagen');
            }

            const producto = new Producto({
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Urlimagen: req.file ? req.file.filename : '',
                Marca: req.body.Marca,
                Encart: req.body.Encart,
                Precio: req.body.Precio
            });
            await producto.save();
            res.send(producto);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.obtenerProductos = async (req , res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error aca')
    }
}

