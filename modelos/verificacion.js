(function() {
    'use strict';
    exports = module.exports = function(app, mongoose) {

        const VerificacionSchema = new mongoose.Schema({
            dni: {
                type: Number,
                minlength: 8
            },
            estado_dni: {
                type: "String"
            }            
        });

        mongoose.model('Verificacion', VerificacionSchema);

    };
})();
