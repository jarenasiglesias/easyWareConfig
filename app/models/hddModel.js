// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

//Schema de hdd
var hddSchema = mongoose.Schema({
    name: String,
    series: String,
    form: String,
    type: String,
    capacity: String,
    cache: String,
    price: Number
});

// creamos el modelo
module.exports = mongoose.model('hdd', hddSchema, 'hdd');