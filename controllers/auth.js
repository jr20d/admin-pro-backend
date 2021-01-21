const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) =>{
    const { email, password } = req.body;

    try{
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Error en email o contraseña'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Error en email o contraseña'
            });
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
};

const googleSignIn = async (req, res) =>{
    const googleToken = req.body.token;
    
    try {
        const {name, email, picture} = await googleVerify(googleToken);

        //Verificar si el usuario existe
        const usuarioBD = await Usuario.findOne({email});
        let usuario;
        
        if (!usuarioBD){
            //Si no existe se crea el usuario con google (true)
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                imagen: picture,
                google: true
            });
        }
        else{
            //Existe el usuario
            usuario = usuarioBD;
            usuario.google = true;
        }

        //Guardando en la BD
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
}

const renewToken = async (req, res) =>{
    const uid = req.uid;

    const [token, usuario] = await Promise.all([
        generarJWT(uid),
        Usuario.findById(uid)
    ]);

    res.json({
        ok: true,
        token,
        usuario
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}