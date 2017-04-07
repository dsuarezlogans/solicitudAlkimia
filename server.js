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
    const Acreedor = require('./modelos/acreedor.js')(app, mongoose);
    // Controladores de las rutas
    const ctrl = require('./controladores/acreedor.js');


    // Middlewares
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cors());

    //API RESt Acreedor
    const rutas = express.Router();

    rutas.route('/acreedor')
        .get(ctrl.findAllAcreedor)
        .post(ctrl.addAcreedor);

    rutas.route('/acreedor/:id')
        .get(ctrl.findById)
        .put(ctrl.updateAcreedor)
        .delete(ctrl.deleteAcreedor);

    app.use('/api', rutas);

    // Iniciar el server
    var server = app.listen(Port, ()=> {
        var port = server.address().port;
        console.log("Servidor Node corriendo en http://localhost:", port);
      });
})();
