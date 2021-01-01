const express = require('express');
require('dotenv').config();

//CORS
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Crear el servidor Express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

/*app.get('/api/usuarios', (req, res) =>{
    res.status(400).json({
        ok: true,
        usuarios: [{
            id: 123,
            nombre: 'Juán'
        }]
    });
});*/

app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});