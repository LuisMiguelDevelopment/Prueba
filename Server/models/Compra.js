const {model , Schema} = require("mongoose");


const CompraSchema = new Schema({
    Nombre : {type: String , require: true},
    Urlimagen: {type: String , require: true},
    Cantidad: {type: Number , require: true},
    Precio: {type: Number , require:true}
});

module.exports = model("Compra",CompraSchema);