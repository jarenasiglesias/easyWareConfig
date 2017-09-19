// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

//Schema de gpu
var gpuSchema = mongoose.Schema({
    brand: String,
    name: String,
    chip: String,
    process: String,
    gpu_clock: Number,
    gpu_boost: Number,
    mem_clock: Number,
    mem_boost: Number,
    mem_size: Number,
    tdp: Number,
    price: Number
});

// creamos el modelo
module.exports = mongoose.model('gpu', gpuSchema, 'gpu');