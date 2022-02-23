require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //coneccion a la base de datos
        this.conectarDB();
        
        //middleware    no son mas que funciones que ayudan a nuestra app
        this.middleware();

        //rutas de nuestra app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosRoutePath, require('../routers/usuario'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando en el puerto ', this.port);
        })
    }

}

module.exports = Server;