const Usuario = require("../models/usuario")
const Role = require('../models/role');

//verifica si el rol es valido
const esRolValido = async(rol ='' ) => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

//verifica si existe el email
const existeEmail = async(correo = '')=>{
    const existEmail = await Usuario.findOne({correo});
    if(existEmail){
        throw new Error(`El email ${correo} ya existe`);
    }
}


module.exports = {
    existeEmail,
    esRolValido
    
}