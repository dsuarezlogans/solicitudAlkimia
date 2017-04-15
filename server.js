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
    app.set('port', (process.env.PORT || 5000));
    const rutas = express.Router();

    // Conexion a la DB
    const MongoDB = process.env.PROD_MONGODB || 'mongodb://alkimia:Alkimia123.@ds155130.mlab.com:55130/solicitud';
    mongoose.connect(MongoDB, function(err, res) {
        if (err) throw err;
        console.log('Conectado a mLab, mongoDB');
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
    rutas.route('/modelo/:user/:pass/:id')
            .get(reqBpm.modelo);

    //API RESt Solicitud
    rutas.route('/solicitud')
         .get(ctrlSolicitud.findAllSolicitud)
         .post(ctrlSolicitud.addSolicitud);
    rutas.route('/solicitud/:id')
         .get(ctrlSolicitud.findById)
         .put(ctrlSolicitud.updateSolicitud);
    rutas.route('/solicitud/instancia/:instancia')
         .get(ctrlSolicitud.findByInstancia);

    //API RESt Usuario
    rutas.route('/usuario/:user')
        .get(ctrlUsuario.findByUser);

    //API RESt Verificacion
    rutas.route('/verificacion/dni/:dni')
         .get(ctrlVerificacion.findByDni);

    app.use('/api', rutas);

    // Iniciar el server
app.listen(app.get('port'), ()=> {
        console.log("Servidor Node corriendo en Puerto", app.get('port'));
      });
})();
