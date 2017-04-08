(function() {
    'use strict';
    exports = module.exports = function(app, mongoose) {

        const SolicitudSchema = new mongoose.Schema({
            dni: {
                type: Number,
                min: [8, 'Dni invalido!']
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
            email: mongoose.SchemaTypes.Email,
            empleador: {
                type: "String",
                capitalizeAll: true
            },
            telefono_empleador: {
                type: "String",
                //validphone: true
            },
            direccion_empleador: {
                type: "String"
            },
            estado_solicitud: String
        });

        mongoose.model('Solicitud', SolicitudSchema);

    };
})();
