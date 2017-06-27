(function() {
  'use strict';

  const geocoder = require('geocoder');

  exports = module.exports = function(app, mongoose) {

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
        type: String,
        // required: [true, 'Error: Latitud no asignada']
      },
      lng: {
        type: String,
        // required: [true, 'Error: Longitud no asignada']
      },
      ingreso: Number,
      monto_credito: Number,
      comentarios: [Comentarios],
      estado_solicitud: String
    });

    mongoose.model('Solicitud', SolicitudSchema);

    SolicitudSchema.pre('save', (next) => {
      let solicitud = this;
      const busqueda = solicitud.direccion;
      geocoder.geocode(busqueda, function(err, data) {
        solicitud.lat = data.results[0].geometry.location.lat;
        solicitud.lng = data.results[0].geometry.location.lng;
        console.log(solicitud);
        next();
      });
      console.log('this gets printed first');
    });
  };
})();
