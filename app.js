var path = require('path');
var express = require('express');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//Express
var app = express(),
    http = require("http"),
    server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')));

//Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    noCache: false
});

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

var options = {
    useMongoClient: true
}

//Mongoose

var configDB = require('./app/config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, options); // connect to our database

//app uses
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'pubgthekingoftheworld' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Carga las rutas de login, register y direcciones de la página, además comprueba contraseñas y correos por si existen o si se mete una cotraseña incorrecta

require('./app/routes/routes.js')(app, passport); 
require('./app/config/passport')(passport);

//Componentes del ordenador almacenados en MongoDB

//CPU

require('./app/routes/pcComponents/routeCpu')(app);

//Mobo

require('./app/routes/pcComponents/routeMobo')(app);

//Gpu

require('./app/routes/pcComponents/routeGpu')(app);

//Ram

require('./app/routes/pcComponents/routeRam')(app);

//Hdd

require('./app/routes/pcComponents/routeHdd')(app);

//Psu

require('./app/routes/pcComponents/routePsu')(app);

//case

require('./app/routes/pcComponents/routeCase')(app);

//lee las configs guardadas por los usuarios
require('./app/routes/computerSaved/readConfig')(app);

//guarda las configs creadas por los usuarios
require('./app/routes/computerSaved/saveConfig')(app);

app.listen(3000);