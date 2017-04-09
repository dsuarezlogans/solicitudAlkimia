(function() {
    'use strict';

    //node_modules
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
                     require('mongoose-schematypes-extend')(mongoose);                     
    const cors = require('cors');

    //Inicializadores del Server
    const app = express();
    const Port = process.env.PORT || 3030;
    const rutas = express.Router();

    // Conexion a la DB
    const MongoDB = process.env.PROD_MONGODB || 'mongodb://alkimia:Alkimia123.@ds155130.mlab.com:55130/solicitud';
    mongoose.connect(MongoDB, function(err, res) {
        if (err) throw err;
        console.log('Conectado a MongoDB');
    });

    //Modelos de Datos
    const Solicitud = require('./modelos/solicitud')(app, mongoose);
    const Usuario = require('./modelos/usuario')(app, mongoose);
    const Verificacion = require('./modelos/verificacion')(app, mongoose);
    // Controladores de las Rutas
    const ctrlSolicitud = require('./controladores/solicitud');
    const ctrlUsuario = require('./controladores/usuario');
    const ctrlVerificacion = require('./controladores/verificacion');
    // HTTP Cliente BPM
    const reqBpm = require('./rest-client/bpm');

    // Middlewares
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cors());

    //API RESt BPM
    rutas.route('/tareas/:user/:pass')
        .get(reqBpm.listaTareas);
    rutas.route('/instancia/avanzar/:user/:pass/:id')
            .post(reqBpm.avanzarInstancia);
    rutas.route('/instancia/signal/:user/:pass/:id/:signal/:event')
            .post(reqBpm.señalInstancia);
    rutas.route('/instancia/iniciar/:user/:pass')
            .post(reqBpm.iniciarInstancia);

    //API RESt Solicitud
    rutas.route('/solicitud')
         .post(ctrlSolicitud.addSolicitud);
    rutas.route('/solicitud/:id')
         .get(ctrlSolicitud.findById)
         .put(ctrlSolicitud.updateSolicitud)
    rutas.route('/solicitud/instancia/:instancia')
         .get(ctrlSolicitud.findByInstancia);

    //API RESt Usuario
    rutas.route('/usuario/:id')
        .get(ctrlUsuario.findById);

    //API RESt Verificacion
    rutas.route('/verificacion/dni/:dni')
         .get(ctrlVerificacion.findByDni);

    app.use('/api', rutas);

    // Iniciar el server
    var server = app.listen(Port, ()=> {
        var port = server.address().port;
        console.log("Servidor Node corriendo en http://localhost:", port);
      });
})();
