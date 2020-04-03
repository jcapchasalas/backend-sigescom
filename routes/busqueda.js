var express = require('express');
var app = express();

var express = require('express');

var app = express();

var Hospital = require('../models/Hospital');
var Medico = require('../models/Medico');
var Usuario = require('../models/usuario');

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;

    Hospital.find({ nombre: busqueda }, (err, hospitales) => {

        res.status(200).json({
            ok: true,
            hospitales = hospitales
            // mensaje: 'Peticion realizada correctamente'
        });
    })


});



/* // Rutas
app.get('/todo/:busqueda', (req, res, next) => {
    // Otra forma en vez de con regex con text
    var queryDoc = { "$text": { "$search": req.params.busqueda } };
    Hospital.find(queryDoc, (err, hospitales) => {
        res.status(200).json({
            ok: true,
            hospitales: hospitales
        });
    });
}); */

module.exports = app;