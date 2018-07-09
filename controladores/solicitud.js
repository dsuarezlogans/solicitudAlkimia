(function() {
  'use strict';

  const mongoose = require('mongoose');
  const Solicitud = mongoose.model('Solicitud');

  //GET - Regresa todos los datos de la coleccion
  exports.findAllSolicitud = (req, res) => {
    Solicitud.find((err, solicitud) => {
      console.log('GET /solicitud');
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(solicitud);
    });
  };

  //GET - Regresa datos de un id especifico
  exports.findById = (req, res) => {
    Solicitud.findById(req.params.id, (err, solicitud) => {
      console.log('GET /solicitud/' + req.params.id);
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(solicitud);
    });
  };

  exports.findByDni = (req, res) => {
    Solicitud.findOne({ dni: req.params.dni }, (err, solicitud) => {
      console.log('GET /solicitud/dni/' + req.params.dni);
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(solicitud);
    });
  };

  exports.findByInstancia = (req, res) => {
    Solicitud.findOne(
      { idInstancia: req.params.instancia },
      (err, solicitud) => {
        console.log('GET /solicitud/instancia/' + req.params.instancia);
        console.log(solicitud);
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(solicitud);
      }
    );
  };

  //POST - Inserta datos
  exports.addSolicitud = (req, res) => {
    console.log(req.body);
    var solicitud = new Solicitud({
      idInstancia: req.body.idInstancia,
      nombre_cliente: req.body.nombre_cliente,
      direccion: req.body.direccion,
      telefono_fijo: req.body.telefono_fijo,
      dni: req.body.dni,
      telefono_movil: req.body.telefono_movil,
      email: req.body.email,
      empleador: req.body.empleador,
      telefono_empleador: req.body.telefono_empleador,
      direccion_empleador: req.body.direccion_empleador,
      monto_credito: req.body.monto_credito,
      numero_instancia: req.body.numero_instancia,
      comentarios: req.body.comentarios,
      estado_solicitud: req.body.estado_solicitud,
      ingreso: req.body.ingreso,
      lat: '',
      lng: ''
      // lat: req.body.lat,
      // lng: req.body.lng
    });

    solicitud.save((err, solicitud) => {
      console.log('POST /solicitud');
      if (err) return res.status(500).send(err);
      res.status(200).jsonp(solicitud);
    });
  };

  //PUT - Actualiza datos existentes
  exports.updateSolicitud = (req, res) => {
    Solicitud.findById(req.params.id, function(err, solicitud) {
      solicitud.nombre_cliente = req.body.nombre_cliente;
      solicitud.direccion = req.body.direccion;
      solicitud.telefono_fijo = req.body.telefono_fijo;
      solicitud.dni = req.body.dni;
      solicitud.telefono_movil = req.body.telefono_movil;
      solicitud.email = req.body.email;
      solicitud.empleador = req.body.empleador;
      solicitud.telefono_empleador = req.body.telefono_empleador;
      solicitud.direccion_empleador = req.body.direccion_empleador;
      solicitud.monto_credito = req.body.monto_credito;
      solicitud.numero_instancia = req.body.numero_instancia;
      solicitud.comentarios = req.body.comentarios;
      solicitud.estado_solicitud = req.body.estado_solicitud;
      solicitud.nota_verificacion = req.body.nota_verificacion;
      solicitud.ingreso = req.body.ingreso;

      solicitud.save(err => {
        console.log('PUT /solicitud/', req.params.id);
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(solicitud);
      });
    });
  };

  //DELETE - Borra datos de un id especifico
  exports.deleteSolicitud = (req, res) => {
    Solicitud.findById(req.params.id, (err, solicitud) => {
      solicitud.remove(err => {
        console.log('DELETE /solicitud/', req.params.id);
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
  };
})();
