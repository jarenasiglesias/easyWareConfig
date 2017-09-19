var GpuModel = require('../../models/gpuModel');

module.exports = function (app) {

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

};


