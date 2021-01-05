const Medico = require('../models/medico');

const getMedicos = async (req, res) =>{
    try {
        const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medicos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hablar con el administrador'
        });
    }
}

const crearMedico = async (req, res) =>{
    const uid = req.uid;
    const { hid, ...object } = req.body;
    
    const medico = new Medico({
        usuario: uid,
        hospital: hid,
        ...object
    });
    
    try {
        const medicoBD = await medico.save();

        res.json({
            ok: true,
            medico: medicoBD
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarMedico = (req, res) =>{
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = (req, res) =>{
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}