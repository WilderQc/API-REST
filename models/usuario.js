
const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require:[true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'la constraseña es obligatoria']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        require: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});



module.exports = model('Usuario', usuarioSchema);