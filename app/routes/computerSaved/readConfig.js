var SaveConfigModel = require('../../models/saveModel');

module.exports = function (app) {

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
};


