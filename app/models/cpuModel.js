// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

// definimos el schema 
var cpuSchema = mongoose.Schema({
    brand: String,
    model: String,
    codename: String,
    socket: String,
    process: String,
    cores: Number,
    threads: Number,
    frequency: Number,
    turbo: Number,
    tdp: Number,
    overclock: String
});

// creamos el modelo
module.exports = mongoose.model('cpu', cpuSchema, 'cpu');