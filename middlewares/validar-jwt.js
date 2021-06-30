const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) =>{
    //Leer el token
    const token = req.header('x-token');
    
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    }
    catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

const validarAdminRole = async (req, res, next) => {
    const uidPeticion = req.uid;
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uidPeticion);
        
        if (!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (uidPeticion === uid){
            return next();
        }

        if (usuarioDB.rol !== 'ADMIN_ROLE'){
            res.status(403).json({
                ok: false,
                msg: 'Usuario no posee privilegios'
            });
        }

        next();
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    validarJWT,
    validarAdminRole
}