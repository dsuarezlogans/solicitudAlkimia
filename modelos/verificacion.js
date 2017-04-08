(function() {
    'use strict';
    exports = module.exports = function(app, mongoose) {

        const VerificacionSchema = new mongoose.Schema({
            dni: {
                type: Number,
                min: [8, 'Dni invalido!']
            },
            estado_dni: {
                type: "String"
            }
        });

        mongoose.model('Verificacion', VerificacionSchema);

    };
})();
