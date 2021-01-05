const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const subirArchivo = (req, res) =>{
    const {coleccion, id} = req.params;

    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposPermitidos.includes(coleccion)){
        return res.status(400).json({
            ok: false,
            msg: 'Error en el parámetro de la colección'
        });
    }

    //Validar que se envía un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envió el archivo'
        });
    }

    //Procesar la imágen
    const file = req.files.imagen;

    const tipoImagen = file.mimetype;

    const extensionesValidas = ['image/jpeg', 'image/png', 'image/gif'];

    if (!extensionesValidas.includes(tipoImagen)){
        return res.status(400).json({
            ok: false,
            msg: 'El formato del archivo no es válido'
        });
    }

    const nombreArchivo = `${uuidv4()}.${tipoImagen.replace('image/', '')}`;

    //path para guardar la imágen
    const path = `./uploads/${coleccion}/${nombreArchivo}`;

    //Usar mv para mover la imágen
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imágen'
            });
        }

        //Actualizar base de datos
        actualizarImagen(coleccion, id, nombreArchivo);
    
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const retornarArchivo = (req, res) =>{
    const {coleccion, foto} = req.params;

    let pathImg = path.join(__dirname, `../uploads/${coleccion}/${foto}`);

    //Imágen por defecto
    if (!fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    
    res.sendFile(pathImg);
}

module.exports = {
    subirArchivo,
    retornarArchivo
}