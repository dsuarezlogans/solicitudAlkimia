(function() {
    'use strict';

    const mongoose = require('mongoose');
    const Verificacion = mongoose.model('Verificacion');

    //GET - Regresa datos de un id especifico
    exports.findByDni = (req, res) => {
        Verificacion.findOne({'dni' : req.params.dni}, (err, verificacion) => {
            if (err) return res.send(500, err.message);

            console.log('GET /verificacion/dni/' + req.params.dni);
            res.status(200).jsonp(verificacion);
        });
    };
})();
