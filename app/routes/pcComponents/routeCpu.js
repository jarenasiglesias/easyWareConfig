var CpuModel = require('../../models/cpuModel');

module.exports = function (app) {

    app.get('/cpu', function (req, res) {
        CpuModel.find(function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    //busca sólo los cpu de marca intel
    app.get('/cpu/intel', function (req, res) {
        console.log("Cpu intel")
        CpuModel.find({
            "brand": 'Intel'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    //busca sólo los cpu de marca AMD
    app.get('/cpu/amd', function (req, res) {
        console.log("Cpu amd")
        CpuModel.find({
            "brand": 'AMD'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

};


