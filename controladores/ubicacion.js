(function() {
  'use strict';

  const tareas = require('../rest-client/bpm');
  const geocoder = require('geocoder');

  exports.ubicacion = (req, res, next) => {

    const busqueda = req.body.direccion;
    console.log(busqueda);
    geocoder.geocode(busqueda, function(err, data) {
      req.body.lat = data.results[0].geometry.location.lat;
      req.body.lng = data.results[0].geometry.location.lng;      
      next();
    });

  };
}());
