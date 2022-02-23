
const bcrypt = require('bcryptjs');
const { request, response } = require('express');
const Usuario = require('../models/usuario');

//regresar
const usuarioGet = async(req=request, res= response)=>{
    const {limite=5, desde = 0} = req.query;
    const query = { estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
   
    res.json({
        msg: 'Get desde el controlador',
        total,
        usuarios
    })
}

//update
const usuarioPut = async(req=request, res= response)=>{

    const id = req.params.id;
    const {_id, password, ...resto} = req.body;
    
    if(password){
        const salto = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salto);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put desde el controlador',
        usuario
    })
}

//insertar
const usuarioPost = async(req=request, res= response)=>{
    const salto = bcrypt.genSaltSync(); 

    const { nombre, correo, password, rol } = req.body;
    const pass = bcrypt.hashSync(password,salto);
    const usuario = new Usuario({nombre,correo,pass, rol});

    //guardar en la BD
    await usuario.save();

    res.json({
        msg: 'Post desde el controlador',
        nombre,
        correo,
        rol,
        pass
    })
}

//eliminar
const usuarioDelete= async(req=request, res= response)=>{

    const {id} = req.params
    //fisicamente lo borramos 
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        msg: 'Delete desde el controlador',
        usuario,
        msg: 'usuario eliminado'
    })
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
}
