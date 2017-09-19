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

var configDB = require('./config/database.js');

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

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
console.log('Funcionando en el puerto: ' + port);

require('./config/passport')(passport);

//Schema del contenido de la CPU


//Schema de cases
var caseSchema = mongoose.Schema({
    name: String,
    form: String,
    external525bay: String,
    internal35bay: String,
    price: Number
});

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

//Schema de mobo


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

//Modelos de la BBDD
var CaseModel = mongoose.model('case', caseSchema, 'case');
var GpuModel = mongoose.model('gpu', gpuSchema, 'gpu');
var PsuModel = mongoose.model('psu', psuSchema, 'psu');
var RamModel = mongoose.model('rams', ramSchema, 'rams');
var HddModel = mongoose.model('hdd', hddSchema, 'hdd');


//CPU

require('./app/routeCpu')(app);

//Mobo

require('./app/routeMobo')(app);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todos los gpu
app.get('/gpu', function (req, res) {
    console.log("Todos los gpu")
    GpuModel.find(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

//busca sólo los gpu de marca Nvidia
app.get('/gpu/nvidia', function (req, res) {
    console.log("gpu Nvidia")
    GpuModel.find({
        "brand": 'NVIDIA'
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

//busca sólo los gpu de marca AMD
app.get('/gpu/amd', function (req, res) {
    console.log("gpu amd")
    GpuModel.find({
        "brand": 'AMD'
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todos los case
app.get('/case', function (req, res) {
    console.log("Todos los cases")
    CaseModel.find(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todas la psu
app.get('/psu', function (req, res) {
    console.log("Todos los psu")
    PsuModel.find(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todas las rams
app.get('/ram', function (req, res) {
    console.log("Todos las rams")
    RamModel.find(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

app.get('/ram/ddr3', function (req, res) {
    console.log("Ram DDR3")
    RamModel.find({
        "type": "DDR3"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/ram/ddr4', function (req, res) {
    console.log("Ram DDR4")
    RamModel.find({
        "type": "DDR4"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todos los hdd
app.get('/hdd', function (req, res) {
    console.log("Todos los hdd")
    HddModel.find(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

var SaveConfigModel = mongoose.model('myConfig', saveConfig, 'myConfig');

app.get('/saveConfig', function (req, res) {
    console.log("Todas las configs")
    SaveConfigModel.find(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

app.get('/saveConfig/multimedia', function (req, res) {
    console.log("Todas las configs para multimedia")
    SaveConfigModel.find({
        "topic": "Configs multimedia"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/saveConfig/casual', function (req, res) {
    console.log("Todas las configs casual")
    SaveConfigModel.find({
        "topic": "Configs casual"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/saveConfig/design', function (req, res) {
    console.log("Todas las configs de diseño")
    SaveConfigModel.find({
        "topic": "Configs diseño"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/saveConfig/gamer', function (req, res) {
    console.log("Todas las configs de gaming")
    SaveConfigModel.find({
        "topic": "Configs gamer"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/saveConfig/office', function (req, res) {
    console.log("Todas las configs")
    SaveConfigModel.find({
        "topic": "Configs de oficina"
    }, function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Guardar en la base de datos

app.post('/saveConfig', function (req, res){
    var config = new SaveConfigModel(req.body)
    console.log("Config guardada!")
    config.save(function (err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

app.listen(3000);