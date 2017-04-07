(function() {
    'use strict';

    const mongoose = require('mongoose');
    const Acreedor = mongoose.model('Acreedor');

    //GET - Regresa todos los datos de la coleccion
    exports.findAllAcreedor = (req, res) => {
        Acreedor.find((err, acreedor) => {
            if (err) return res.send(500, err.message);

            console.log('GET /acreedor');
            res.status(200).jsonp(acreedor);
        });
    };

    //GET - Regresa datos de un id especifico
    exports.findById = (req, res) => {
        Acreedor.findById(req.params.id, (err, acreedor) => {
            if (err) return res.send(500, err.message);

            console.log('GET /acreedor/' + req.params.id);
            res.status(200).jsonp(acreedor);
        });
    };

    //POST - Inserta datos
    exports.addAcreedor = (req, res) => {
        console.log('POST /acreedor');
        console.log(req.body);

        var acreedor = new Acreedor({
            nombre_cliente: req.body.nombre_cliente,
            direccion: req.body.direccion,
            telefono_fijo: req.body.telefono_fijo,
            dni: req.body.dni,
            telefono_movil: req.body.telefono_movil,
            email: req.body.email,
            empleador: req.body.empleador,
            telefono_empleador: req.body.telefono_empleador,
            direccion_empleador: req.body.direccion_empleador,
            estado_solicitud: req.body.estado_solicitud,
        });

        acreedor.save((err, acreedor) => {
            if (err) return res.status(500).send(err.errors.dni.message);
            res.status(200).jsonp(acreedor);
        });
    };

    //PUT - Actualiza datos existentes
    exports.updateAcreedor = (req, res) => {
        Acreedor.findById(req.params.id, function(err, acreedor) {
            acreedor.nombre_cliente = req.body.nombre_cliente;
            acreedor.direccion = req.body.direccion;
            acreedor.telefono_fijo = req.body.telefono_fijo;
            acreedor.dni = req.body.dni;
            acreedor.telefono_movil = req.body.telefono_movil;
            acreedor.email = req.body.email;
            acreedor.empleador = req.body.empleador;
            acreedor.telefono_empleador = req.body.telefono_empleador;
            acreedor.direccion_empleador = req.body.direccion_empleador;
            acreedor.estado_solicitud = req.body.estado_solicitud;

            acreedor.save((err) => {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(acreedor);
            });
        });
    };

    //DELETE - Borra datos de un id especifico
    exports.deleteAcreedor = (req, res) => {
        Acreedor.findById(req.params.id, (err, acreedor) => {
            acreedor.remove((err)=> {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            });
        });
    };
})();
