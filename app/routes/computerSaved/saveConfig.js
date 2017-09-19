var SaveConfigModel = require('../../models/saveModel');

module.exports = function (app) {
    app.post('/saveConfig', function (req, res){
        var config = new SaveConfigModel(req.body)
        console.log("Config guardada!")
        config.save(function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    })
};


