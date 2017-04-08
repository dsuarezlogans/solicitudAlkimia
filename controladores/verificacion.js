(function() {
    'use strict';

    const mongoose = require('mongoose');
    const Verificacion = mongoose.model('Verificacion');

    //GET - Regresa todos los datos de la coleccion
    exports.findAllVerificacion = (req, res) => {
        Verificacion.find((err, verificacion) => {
            if (err) return res.send(500, err.message);

            console.log('GET /verificacion');
            res.status(200).jsonp(verificacion);
        });
    };

    //GET - Regresa datos de un id especifico
    exports.findById = (req, res) => {
        Verificacion.findById(req.params.id, (err, verificacion) => {
            if (err) return res.send(500, err.message);

            console.log('GET /verificacion/' + req.params.id);
            res.status(200).jsonp(verificacion);
        });
    };

    //GET - Regresa datos de un id especifico
    exports.findByDni = (req, res) => {
        Verificacion.findOne({'dni' : req.params.dni}, (err, verificacion) => {
            if (err) return res.send(500, err.message);

            console.log('GET /verificacion/dni/' + req.params.dni);
            res.status(200).jsonp(verificacion);
        });
    };

    //POST - Inserta datos
    exports.addVerificacion = (req, res) => {
        console.log('POST /verificacion');
        console.log(req.body);

        var verificacion = new Verificacion({
            dni: req.body.dni,
            estado_dni: req.body.estado_dni
        });

        verificacion.save((err, verificacion) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(verificacion);
        });
    };

    //PUT - Actualiza datos existentes
    exports.updateVerificacion = (req, res) => {
        Verificacion.findById(req.params.id, function(err, verificacion) {
            verificacion.dni = req.body.nombre_usuario;
            verificacion.estado_dni = req.body.password;

            verificacion.save((err) => {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(verificacion);
            });
        });
    };

    //DELETE - Borra datos de un id especifico
    exports.deleteVerificacion = (req, res) => {
        Verificacion.findById(req.params.id, (err, verificacion) => {
            verificacion.remove((err)=> {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            });
        });
    };
})();
