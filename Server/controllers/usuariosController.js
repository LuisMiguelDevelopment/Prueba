const User = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const { createToeknAccess } = require('../libs/jwt.js');
const jwt = require ('jsonwebtoken');
const { TOKEN_SECRET } = require ('../config/config.js');

exports.register = async (req , res)=>{
  const {Email,Contrasena, Nombre}= req.body;

  try {
      const userFound = await User.findOne({Email})
      if(userFound) return res.status(400).json(["The email is already in use"])

      const passwordHash = await bcrypt.hash(Contrasena, 10)
      const newUser = new User({
         Nombre,
         Email,
         Contrasena:passwordHash 
      });
      const userSaved = await newUser.save();
      const token = await createToeknAccess({id:userSaved._id});
      res.cookie('token',token)
      res.status(201).json({
          id:userSaved._id,
          Nombre:userSaved.Nombre,
          Email :userSaved.Email
      });
  } catch (error) {
      res.status(500).json({message:error.message})
  }

};


exports.login = async (req , res)=>{
  const {Email,Contrasena}= req.body;
  try {
      const userFound = await User.findOne({Email})
       if(!userFound) return res.status(400).json({message : "User not found"});

      const isMatch = await bcrypt.compare(Contrasena , userFound.Contrasena);
      if(!isMatch) return res.status(400).json({message: "Error in Credentials"});

      
      const token = await createToeknAccess({id:userFound._id});
      res.cookie('token',token)
      res.status(201).json({
          id:userFound._id,
          Nombre:userFound.Nombre,
          Email :userFound.Email
      });
  } catch (error) {
      res.status(500).json({message:error.message})
  }

};



exports.logout = (req, res)=>{
  res.cookie('token','',{
      expires : new Date(0),
  });
  return res.sendStatus(200);
}




exports.logout = (req, res)=>{
  res.cookie('token','',{
      expires : new Date(0),
  });
  return res.sendStatus(200);
}


exports.verifyToken = async (req , res)=>{
  const {token} = req.cookies
  if(!token) return res.status(401).json({message:"Unauthorized"})

  jwt.verify(token ,TOKEN_SECRET , async(err,user)=>{
      if(err)return res.status(401).json({message:"Unauthorized"})

      const userFound = await User.findById(user.id)
      if(!userFound) return res.status(401).json({message:"Unauthorized"})

      return res.json({
          id:userFound.id,
          Nombre: userFound.Nombre,
          Email: userFound.Email
      })
  })
}