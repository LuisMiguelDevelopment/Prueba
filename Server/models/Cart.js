const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    Nombre: {type: String, require:true},
    Urlimagen: {type: String , require: true},
    Cantidad: {type: Number , require: true},
    Precio: {type: Number , require:true},
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Usuario',
        require: true
    }
});

module.exports = mongoose.model('Cart',CartSchema)