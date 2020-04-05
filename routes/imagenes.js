var express = require('express');
var app = express();

const path = require('path');
const fs = require('fs');

app.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;

    //path para encontral la imagen
    var pathImagen = path.resolve(__dirname, `../upload/${tipo}/${img}`);

    //Verificar si el path es valido
    if (fs.exitsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        var pathNoImagen = path.resolve(__dirname, `../assets/no-img.jpg`);
        res.sendFile(pathNoImagen);
        console.log(pathNoImagen);

    }

});




module.exports = app;