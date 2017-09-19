// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// definimos el schema 
var userSchema = mongoose.Schema({
    email: String,
    password: String,
    myconfig: Array
});

// metodos ======================
// generando un hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// comprobando si la contraseña es válida
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// creamos el modelo
module.exports = mongoose.model('User', userSchema);