const express = require('express');
require('dotenv').config();

//CORS
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Crear el servidor Express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
dbConnection();

console.log(process.env);

//Rutas
app.get('/', (req, res) =>{
    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});