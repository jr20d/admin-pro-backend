const { response } = require('express');
const bcrypt = require('bcryptjs');

//Importando modelo de Usuario
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;

    /*const usuarios = await Usuario.find({}, 'nombre email google rol')
    .skip(desde).limit(5);
    const total = await Usuario.count();*/

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email google rol imagen')
        .skip(desde).limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) => {
    const { nombre, password, email } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});

        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}

const actualizarUsuario = async (req, res = response) =>{
    //TODO: Validar token y comprobar si es el usuario correcto
    
    const uid = req.params.id;
    
    try{
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        //Actualizaciones
        const {password, google, email, ...campos} = req.body;
        
        if (usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if (!usuarioDB.google){
            campos.email = email;

            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

            res.json({
                ok: true,
                usuarioActualizado
            });
        }
        else{
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
            if (usuarioDB.email !== usuarioActualizado.email || usuarioDB.nombre !== usuarioActualizado.nombre){
                res.status(406).json({
                    ok: false,
                    msg: 'No puede realizar cambios como el nombre o el correo de un usuario de Google'
                });
            }
            else{
                res.json({
                    ok: true,
                    usuarioActualizado
                });
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}

const borrarUsuario = async (req, res = response) =>{
    const uid = req.params.id;

    try{
        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(404).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}