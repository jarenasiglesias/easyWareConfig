var PsuModel = require('../../models/psuModel');

module.exports = function(app) {

    app.get('/psu', function(req, res) {
        console.log("Todos los psu")
        PsuModel.find(function(err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    })

};