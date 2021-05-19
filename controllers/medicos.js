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

const getMedicoById = async (req, res) =>{
    try {
        const medico = await Medico.findById(req.params.id)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
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

const actualizarMedico = async (req, res) =>{
    const uid = req.uid;
    const id = req.params.id;
    const {hid, ...object} = req.body;

    try {
        const medico = await Medico.findById(id);

        if (!medico){
            res.status(400).json({
                ok: true,
                msg: 'No se encontró un médico con ese id'
            });
        }

        const cambios = {
            hospital: hid,
            usuario: uid,
            ...object
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambios, {new: true});
        
        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hablar con el administrador'
        });
    }
}

const borrarMedico = async (req, res) =>{
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        if (!medico){
            res.status(400).json({
                ok: true,
                msg: 'No se encontró un médico con ese id'
            });
        }

        await Medico.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Registro de médico eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hablar con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}