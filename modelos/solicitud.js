(function() {
  'use strict';

  const geocoder = require('geocoder');
  const mongoose = require('mongoose');

    const Comentarios = new mongoose.Schema({
      titulo: String,
      cuerpo: String,
      fecha: Date,
      usuario: String
    });

    const SolicitudSchema = new mongoose.Schema({
      idInstancia: Number,
      dni: {
        type: Number,
        minlength: [8, 'Dni invalido!']
      },
      nombre_cliente: {
        type: "String",
        capitalizeAll: true
      },
      direccion: {
        type: "String"
      },
      telefono_fijo: {
        type: "String",
        //validphone: true
      },
      telefono_movil: {
        type: "String",
        //validphone: true
      },
      email: String,
      empleador: {
        type: "String",
        capitalizeAll: true
      },
      telefono_empleador: {
        type: "String",
        //validphone: true
      },
      nota_verificacion: {
        type: "String"
      },
      direccion_empleador: {
        type: "String"
      },
      lat: {
        type: String
      },
      lng: {
        type: String
      },
      ingreso: Number,
      monto_credito: Number,
      comentarios: [Comentarios],
      estado_solicitud: String
    });

    module.exports = mongoose.model('Solicitud', SolicitudSchema);

})();
