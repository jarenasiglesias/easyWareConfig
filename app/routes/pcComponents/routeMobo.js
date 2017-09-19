var MoboModel = require('../../models/moboModel');

module.exports = function (app) {

    //busca todas las motherboard y se catagorizan según socket
    app.get('/motherboard', function (req, res) {
        console.log("Todos los mobo")
        MoboModel.find(function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    })

    app.get('/motherboard/1151', function (req, res) {
        console.log("socket 1151")
        MoboModel.find({
            "socket": '1151'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/motherboard/1150', function (req, res) {
        console.log("socket 1150")
        MoboModel.find({
            "socket": '1150'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/motherboard/2066', function (req, res) {
        console.log("socket 2066")
        MoboModel.find({
            "socket": '2066'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/motherboard/2011-3', function (req, res) {
        console.log("socket 2011-3")
        MoboModel.find({
            "socket": '2011-3'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/motherboard/am3+', function (req, res) {
        console.log("socket am3+")
        MoboModel.find({
            "socket": 'AM3+'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/motherboard/am4', function (req, res) {
        console.log("socket am4")
        MoboModel.find({
            "socket": 'AM4'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/motherboard/fm2+', function (req, res) {
        console.log("socket fm2+")
        MoboModel.find({
            "socket": 'FM2+'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });
};


