(function() {
    'use strict';
    exports = module.exports = function(app, mongoose) {

        const UsuarioSchema = new mongoose.Schema({
            nombre_usuario: {
                type: "String"
            },
            password: {
                type: "String"
            },
            roles: {
                type: "String"
            },
            cadena_acceso: {
                type: "String"
            }
        });

        mongoose.model('Usuario', UsuarioSchema);

    };
})();
