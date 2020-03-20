// Requires
var express = require('express');
var mongoose = require('mongoose');


// Inicializar variable
var app = express();


//Conexion a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/sigescomDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos1: \x1b[32m%s\x1b[0m', 'online');

});


// Rutas
app.get('/', (req, res, next) => {

    res.status(403).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })

});


// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express Server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})