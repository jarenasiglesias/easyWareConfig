// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

// definimos el schema 
var moboSchema = mongoose.Schema({
    name: String,
    socket: String,
    form: String,
    tdp: Number,
    ram_slots: Number,
    ram_max: Number,
    price: Number
});

// creamos el modelo
module.exports = mongoose.model('motherboard', moboSchema, 'motherboard');
