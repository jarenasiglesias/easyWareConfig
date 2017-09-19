// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

//Schema de configs guardadas o para crear por usuarios
var saveConfig = mongoose.Schema({
    cpu: String,
    mobo: String,
    gpu: String,
    ram: String,
    hdd: String,
    psu: String,
    case: String,
    price: Number,
    topic: String
});

// creamos el modelo
module.exports = mongoose.model('myConfig', saveConfig, 'myConfig');