(function() {
    'use strict';

    const mongoose = require('mongoose');
    const Usuario = mongoose.model('Usuario');

    //GET - Regresa todos los datos de la coleccion
    exports.findAllUsuario = (req, res) => {
        Usuario.find((err, usuario) => {
            if (err) return res.send(500, err.message);

            console.log('GET /usuario');
            res.status(200).jsonp(usuario);
        });
    };

    //GET - Regresa datos de un id especifico
    exports.findById = (req, res) => {
        Usuario.findById(req.params.id, (err, usuario) => {
            if (err) return res.send(500, err.message);

            console.log('GET /usuario/' + req.params.id);
            res.status(200).jsonp(usuario);
        });
    };

    exports.findByUser = (req, res) => {
        Usuario.findOne({"nombre_usuario":req.params.user}, (err, usuario) => {
            if (err) return res.send(500, err.message);

            console.log('GET /usuario/' + req.params.user);
            console.log(usuario)
            res.status(200).jsonp(usuario);
        });
    };

    //POST - Inserta datos
    exports.addUsuario = (req, res) => {
        console.log('POST /usuario');
        console.log(req.body);
        console.log(req.body.nombre_usuario);

        var usuario = new Usuario({
            nombre_usuario: req.body.nombre_usuario,
            password: req.body.password,
            roles: req.body.roles,
            cadena_acceso: req.body.cadena_acceso
        });

        usuario.save((err, usuario) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(usuario);
        });
    };

    //PUT - Actualiza datos existentes
    exports.updateUsuario = (req, res) => {
        Usuario.findById(req.params.id, function(err, usuario) {
            usuario.nombre_usuario = req.body.nombre_usuario;
            usuario.password = req.body.password;
            usuario.roles = req.body.roles;
            usuario.cadena_acceso = req.body.cadena_acceso;


            usuario.save((err) => {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(usuario);
            });
        });
    };

    //DELETE - Borra datos de un id especifico
    exports.deleteUsuario = (req, res) => {
        Usuario.findById(req.params.id, (err, usuario) => {
            usuario.remove((err)=> {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            });
        });
    };
})();
