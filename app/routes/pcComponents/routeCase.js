var CaseModel = require('../../models/caseModel');

module.exports = function (app) {

    app.get('/case', function (req, res) {
        console.log("Todos los cases")
        CaseModel.find(function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    })

    app.get('/case/fullatx', function (req, res) {
        console.log("case full atx")
        CaseModel.find({
            "form": 'Full ATX'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/case/microatx', function (req, res) {
        console.log("case micro atx")
        CaseModel.find({
            "form": 'Micro ATX'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });

    app.get('/case/miniitx', function (req, res) {
        console.log("case mini itx")
        CaseModel.find({
            "form": 'Mini ITX'
        }, function (err, p) {
            if (err) return console.error(err);
            res.json(p);
        });
    });
};


