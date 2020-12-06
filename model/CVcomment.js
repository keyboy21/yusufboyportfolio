const mongoose = require('mongoose');

const CVschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
  
})

module.exports = mongoose.model('yusufboyCVcomment', CVschema) 