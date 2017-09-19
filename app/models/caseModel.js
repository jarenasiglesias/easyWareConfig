// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

//Schema de cases
var caseSchema = mongoose.Schema({
    name: String,
    form: String,
    external525bay: String,
    internal35bay: String,
    price: Number
});

//Modelos de la BBDD
module.exports = mongoose.model('case', caseSchema, 'case');