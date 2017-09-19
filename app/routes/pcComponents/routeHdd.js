var HddModel = require('../../models/hddModel');

module.exports = function (app) {
    app.get('/hdd', function (req, res) {
        console.log("Todos los hdd")
        HddModel.find(function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    })
};


