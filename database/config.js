//Configuración de Mongoose
const mongoose = require('mongoose');

//Valores de la conexión con variables de entorno
require('dotenv').config();

const dbConnection = async () => {
    try {
        //Cadena de conexión a la bd
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD, ver logs');
    }
}

module.exports = {
    dbConnection
}