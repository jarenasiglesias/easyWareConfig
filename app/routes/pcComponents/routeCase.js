var CaseModel = require('../../models/caseModel');

module.exports = function (app) {

    app.get('/case', function (req, res) {
        console.log("Todos los cases")
        CaseModel.find(function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    })
};


