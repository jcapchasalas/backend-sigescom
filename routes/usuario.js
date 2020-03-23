var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

//=================================================================
// OBETENER TODOS LOS USUARIO
//=================================================================

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre  email img role')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error Cargando Usuario',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });
});


//=================================================================
// ACTUALIZAR USUARIO 
//=================================================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {



        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Erro al buscar usuario',
                errors: err
            });

        }

        //si es nulo
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el ID ' + id + ' no existe',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar usuario',
                    errors: err
                });

            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                body: usuarioGuardado,
            });

        })

    });

});


//=================================================================
// CREAR UN NUEVO USUARIO
//=================================================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    //guardar los datos
    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });

        }

        res.status(201).json({
            ok: true,
            body: usuarioGuardado,
            usuariotoken: req.usuario
        });

    });

});

//=================================================================
// BORRAR USUARIO POR EL ID 
//=================================================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Erro al borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe usuario con ese ID',
                errors: { message: 'No existe usuario con ese ID_' }
            });
        }


        res.status(200).json({
            ok: true,
            body: usuarioBorrado,
        });

    })

});

module.exports = app;