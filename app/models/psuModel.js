// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

//Schema de psu
var psuSchema = mongoose.Schema({
    name: String,
    series: String,
    form: String,
    efficiency: String,
    watts: Number,
    modular: String,
    price: Number
});

// creamos el modelo
module.exports = mongoose.model('psu', psuSchema, 'psu');