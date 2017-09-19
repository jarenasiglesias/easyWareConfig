var RamModel = require('../../models/ramModel');

module.exports = function (app) {

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
};


