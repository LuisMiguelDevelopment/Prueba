const Compra = require("../models/Compra");
const Cart = require("../models/Cart")

exports.getCompra = async (req ,res)=>{
    const compra = await Compra.find();

    if(compra){
        res.json({compra})
    }else{
        res.json({msg:"No se hizo ninguna compra"})
    }

}

exports.addAlaCompra = async (req ,res)=>{
    const { Nombre, Urlimagen, Precio , Cantidad } = req.body;
    
    const estaEnCarrito = await Cart.findOne({ Nombre })
    if(!estaEnCarrito){
        res.json({
            msg: 'El producto no se encuentra en la base de datos'
        })
    }
    else if(estaEnCarrito){
        const newCompra = new Compra({
            Nombre,
            Urlimagen,
            Precio,
            Cantidad
        });

        await estaEnCarrito.save();
        await newCompra.save();


        res.json({
            msg: 'La compra se realizo',
        })

    }


}
