const { Schema, model, set } = require('mongoose');

set('useFindAndModify', false);

const HospitalSchema = Schema({
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
    }
}, {collection: 'hospitales'});

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Hospital', HospitalSchema);