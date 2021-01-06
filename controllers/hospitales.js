const hospital = require('../models/hospital');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res) =>{
    try {
        const hospitales = await Hospital.find().populate('usuario', 'nombre img');

        res.json({
            ok: true,
            hospitales
        });
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }    
}

const crearHospital = async (req, res) =>{
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try{
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    }
    catch(error){
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarHospital = async (req, res) =>{
    const id = req.params.id;
    const uid = req.uid;
    
    try {
        const hospital = await Hospital.findById(id);
        
        if (!hospital){
            res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        
        const cambios = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambios, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el Administrador'
        });
    }    
}

const borrarHospital = async (req, res) =>{
    const id = req.params.id;
    
    try {
        const hospital = await Hospital.findById(id);

        if (!hospital){
            res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el Administrador'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}