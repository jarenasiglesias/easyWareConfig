var path = require('path');
var express = require('express');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');

//Express
var app = express(),
    http = require("http"),
    server = http.createServer(app)

app.use(express.static(path.join(__dirname,'public')));

//Nunjucks
nunjucks.configure('views', {
    autoescape:true,
    express: app,
    watch: true,
    noCache: false
});

app.engine('html',nunjucks.render);
app.set('view engine', 'html');

app.get("/", function(req, res) {
    res.render("layouts/startconfig.html", null);
})

app.get("/posts", function(req, res) {
    res.render("layouts/posts.html", null);
})

//Mongoose
var uri = "mongodb://localhost:27017/hardconf";
var options = {
    useMongoClient: true
}
var db = mongoose.connection;

//Conexion a MongoDB
mongoose.connect(uri, options);
db.on('error', function() {
    console.log("Error al conectarse a MongoDB")
});
db.once('open', function() {
    console.log("Conectado a MongoDB")
});

//Schema del contenido de la CPU
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
var moboSchema = mongoose.Schema({
    name: String,
    socket: String,
    form: String,
    tdp: Number,
    ram_slots: Number,
    ram_max: Number,
    price: Number
});

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
var storageSchema = mongoose.Schema({
    name: String,
    series: String,
    form: String,
    type: String,
    capacity: String,
    cache: String,
    price: Number
});

//Modelos de la BBDD
var CpuModel = mongoose.model('cpu', cpuSchema, 'cpu');
var CaseModel = mongoose.model('case', caseSchema, 'case');
var GpuModel = mongoose.model('gpu', gpuSchema, 'gpu');
var MoboModel = mongoose.model('motherboard', moboSchema, 'motherboard');
var PsuModel = mongoose.model('psu', psuSchema, 'psu');
var RamModel = mongoose.model('rams',ramSchema, 'rams');
var StorageModel = mongoose.model('storage',storageSchema,'storage');

/*

//Búsqueda en consola de todos los elementos cpu
CpuModel.find({}, function(err, p){
	console.log(p);
})

var cpu = new Cpumodel({
    brand: 'String',
    model: 'String',
    codename: 'String',
    socket: 'String',
    process: 0,
    cores: 0,
    threads: 0,
    frequency: 0,
    turbo: 0,
    tdp: 0,
    overclock: 'String'
})

cpu.save(function(err) {
    if (err) throw err;
    console.log('Nuevo cpu guardado');
});
*/

//CPU
app.get('/cpu', function(req, res) {
    console.log("Todos los cpu")
    CpuModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

//busca sólo los cpu de marca intel
app.get('/cpu/intel', function(req, res) {
    console.log("Cpu intel")
    CpuModel.find({
        "brand": 'Intel'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

//busca sólo los cpu de marca AMD
app.get('/cpu/amd', function(req, res) {
    console.log("Cpu amd")
    CpuModel.find({
        "brand": 'AMD'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todos los gpu
app.get('/gpu', function(req, res) {
    console.log("Todos los gpu")
    GpuModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

//busca sólo los gpu de marca Nvidia
app.get('/gpu/nvidia', function(req, res) {
    console.log("gpu Nvidia")
    GpuModel.find({
        "brand": 'NVIDIA'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

//busca sólo los gpu de marca AMD
app.get('/gpu/amd', function(req, res) {
    console.log("gpu amd")
    GpuModel.find({
        "brand": 'AMD'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todos los case
app.get('/case', function(req, res) {
    console.log("Todos los cases")
    CaseModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todas las mobo
app.get('/motherboard', function(req, res) {
    console.log("Todos los mobo")
    MoboModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

app.get('/motherboard/1151', function(req, res) {
    console.log("socket 1151")
    MoboModel.find({
        "socket": '1151'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/motherboard/1150', function(req, res) {
    console.log("socket 1150")
    MoboModel.find({
        "socket": '1150'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/motherboard/2066', function(req, res) {
    console.log("socket 2066")
    MoboModel.find({
        "socket": '2066'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/motherboard/2011-3', function(req, res) {
    console.log("socket 2011-3")
    MoboModel.find({
        "socket": '2011-3'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/motherboard/am3+', function(req, res) {
    console.log("socket am3+")
    MoboModel.find({
        "socket": 'AM3+'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/motherboard/am4', function(req, res) {
    console.log("socket am4")
    MoboModel.find({
        "socket": 'AM4'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});

app.get('/motherboard/fm2+', function(req, res) {
    console.log("socket fm2+")
    MoboModel.find({
        "socket": 'FM2+'
    }, function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todas la psu
app.get('/psu', function(req, res) {
    console.log("Todos los psu")
    PsuModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todas las rams
app.get('/ram', function(req, res) {
    console.log("Todos las rams")
    RamModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//busca todos los hdd
app.get('/storage', function(req, res) {
    console.log("Todos los hdd")
    StorageModel.find(function(err, p) {
        if (err) return console.error(err);
        res.json(p);
    });
})

app.listen(3000);