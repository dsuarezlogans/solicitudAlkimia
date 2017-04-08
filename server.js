(function() {
    'use strict';
    //node_modules
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
                     require('mongoose-schematypes-extend')(mongoose);
                     require('mongoose-type-email');
    const cors = require('cors');

    //Inicializadores del Server
    const app = express();
    const Port = process.env.PORT || 3030;

    // Conexion a la DB
    const MongoDB = process.env.PROD_MONGODB || 'mongodb://alkimia:Alkimia123.@ds155130.mlab.com:55130/solicitud';
    mongoose.connect(MongoDB, function(err, res) {
        if (err) throw err;
        console.log('Conectado a MongoDB');
    });

    //Modelos de datos
    const Solicitud = require('./modelos/solicitud.js')(app, mongoose);
    const Usuario = require('./modelos/usuario.js')(app, mongoose);
    const Verificacion = require('./modelos/verificacion.js')(app, mongoose);
    // Controladores de las rutas
    const ctrlSolicitud = require('./controladores/solicitud.js');
    const ctrlUsuario = require('./controladores/usuario.js');
    const ctrlVerificacion = require('./controladores/verificacion.js');


    // Middlewares
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cors());

    //API RESt Solicitud
    const rutas = express.Router();

    rutas.route('/solicitud')
        .get(ctrlSolicitud.findAllSolicitud)
        .post(ctrlSolicitud.addSolicitud);

    rutas.route('/solicitud/:id')
        .get(ctrlSolicitud.findById)
        .put(ctrlSolicitud.updateSolicitud)
        .delete(ctrlSolicitud.deleteSolicitud);

    rutas.route('/solicitud/dni/:dni')
        .get(ctrlSolicitud.findByDni);

    //API RESt Usuario
    rutas.route('/usuario')
        .get(ctrlUsuario.findAllUsuario)
        .post(ctrlUsuario.addUsuario);

    rutas.route('/usuario/:id')
        .get(ctrlUsuario.findById)
        .put(ctrlUsuario.updateUsuario)
        .delete(ctrlUsuario.deleteUsuario);

    rutas.route('/usuario/name/:name')
        .get(ctrlUsuario.findByName);

    //API RESt Verificacion
    rutas.route('/verificacion')
        .get(ctrlVerificacion.findAllVerificacion)
        .post(ctrlVerificacion.addVerificacion);

    rutas.route('/verificacion/:id')
        .get(ctrlVerificacion.findById)
        .put(ctrlVerificacion.updateVerificacion)
        .delete(ctrlVerificacion.deleteVerificacion);

    rutas.route('/verificacion/dni/:dni')
        .get(ctrlVerificacion.findByDni);

    app.use('/api', rutas);

    // Iniciar el server
    var server = app.listen(Port, ()=> {
        var port = server.address().port;
        console.log("Servidor Node corriendo en http://localhost:", port);
      });
})();
