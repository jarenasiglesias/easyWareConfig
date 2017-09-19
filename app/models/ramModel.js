// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

//Schema de rams
var ramSchema = mongoose.Schema({
    name: String,
    speed: String,
    type: String,
    cas: Number,
    modules: String,
    tdp: Number,
    size: Number,
    price: Number
});

// creamos el modelo
module.exports = mongoose.model('rams', ramSchema, 'rams');