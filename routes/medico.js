var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Medico = require('../models/Medico');

//=================================================================
// OBTENER TODOS LOS HOSPITALES
//=================================================================

app.get('/', (req, res, next) => {

    Medico.find().populate([{
        path: 'usuario',
        model: 'Usuario'
    }, {
        path: 'hospital',
        model: 'Hospital'
    }]).exec(function(err, medicos) {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Medicos',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            medicos: medicos
        });
    });
});


//=================================================================
// ACTUALIZAR HOSPITAL 
//=================================================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Erro al buscar medico',
                errors: err
            });

        }

        //si es nulo
        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el ID ' + id + ' no existe',
                errors: { message: 'No existe medico con ese ID' }
            });
        }

        medico.nombre = body.nombre;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;


        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar medico',
                    errors: err
                });

            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado,
            });

        })

    });

});


//=================================================================
// CREAR UN NUEVO HOSPITAL
//=================================================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    //guardar los datos
    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear medico',
                errors: err
            });

        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        });

    });

});



//=================================================================
// BORRAR USUARIO POR EL ID 
//=================================================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Erro al borrar medico',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe medico con ese ID',
                errors: { message: 'No existe medico con ese ID_' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado,
        });

    })

});

module.exports = app;