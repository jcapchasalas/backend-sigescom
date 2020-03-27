var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Hospital = require('../models/Hospital');

//=================================================================
// OBETENER TODOS LOS HOSPITALES
//=================================================================

app.get('/', (req, res, next) => {

    Hospital.find({})

    .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error Cargando Hospitales',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    hospitales: hospitales
                });
            });
});


//=================================================================
// ACTUALIZAR HOSPITAL 
//=================================================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Erro al buscar hospital',
                errors: err
            });

        }

        //si es nulo
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el ID ' + id + ' no existe',
                errors: { message: 'No existe hospital con ese ID' }
            });
        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario._id;


        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar hospital',
                    errors: err
                });

            }

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado,
            });

        })

    });

});


//=================================================================
// CREAR UN NUEVO HOSPITAL
//=================================================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id,
    });

    //guardar los datos
    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });

        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });

    });

});



//=================================================================
// BORRAR USUARIO POR EL ID 
//=================================================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Erro al borrar hospital',
                errors: err
            });
        }

        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe hospital con ese ID',
                errors: { message: 'No existe hospital con ese ID_' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado,
        });

    })

});

module.exports = app;