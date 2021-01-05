/*
    UPLOADS
    RUTA: api/uploads/:coleccion/:id
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { subirArchivo, retornarArchivo } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:coleccion/:id', validarJWT, subirArchivo);

router.get('/:coleccion/:foto', validarJWT, retornarArchivo);

module.exports = router;