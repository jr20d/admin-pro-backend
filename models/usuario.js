const {Schema, model, set} = require('mongoose');

set('useFindAndModify', false);

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true        
    },
    password:{
        type: String,
        required: true
    },
    imagen:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;

    return object;
});

module.exports = model('Usuario', UsuarioSchema);