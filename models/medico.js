const { Schema, model, set } = require('mongoose');

set('useFindAndModify', false);

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Medico', MedicoSchema);