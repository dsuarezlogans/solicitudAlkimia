(function() {
    'use strict';
    exports = module.exports = function(app, mongoose) {

        const VerificacionSchema = new mongoose.Schema({
            dni: {
                type: Number,
                min: [8, 'Dni invalido!']
            },
            estado_dni: {
                type: "Boolean"
            },
            monto_credito: {
                type: Number
            }
        });

        mongoose.model('Verificacion', VerificacionSchema);

    };
})();
