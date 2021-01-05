const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //Borrar la imágen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (coleccion, id, nombreArchivo) => {
    let pathViejo;
    
    switch (coleccion) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('Médico no encontrado');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Hospital no encontrado');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('Usuario no encontrado');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.imagen}`;
            borrarImagen(pathViejo);

            usuario.imagen = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }
}

module.exports = {
    actualizarImagen
}