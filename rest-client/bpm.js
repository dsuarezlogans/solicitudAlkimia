(function() {
    'use strict';

    const request = require('request');
    const _ = require('lodash');
    const baseUrl = 'ec2-54-68-67-195.us-west-2.compute.amazonaws.com:8080/business-central';

    exports.listaTareas = (req, res) => {
        var O = [];
        const user = req.params.user;
        const pass = req.params.pass;
        const url = `http://${user}:${pass}@${baseUrl}/rest/task/query`;
        const headers = {
            'Accept': 'application/json'
        };

        request({
            url: url,
            headers: headers
        }, (error, response, body) => {
            const resq = JSON.parse(body);
            const tareasBpm = resq.taskSummaryList;
            console.log(body);
            console.log("asdasdad");
            const tarea = _.each(tareasBpm, (value, key) => {
                if (value.status !== 'Completed') {
                    O.push({
                        idInstancia: value['process-instance-id'],
                        nombreTarea: value.name,
                        idTarea: value.id
                    });
                }
            });
            if (O.length <= 0) return res.status(400).jsonp({
                mensaje: 'No hay tareas disponible'
            });
            console.log('GET /tareas');
            res.status(200).send(O);

        });
    };

    exports.iniciarInstancia = (req, res) => {
        const user = req.params.user;
        const pass = req.params.pass;
        const urlIniciar = `http://${user}:${pass}@${baseUrl}/rest/runtime/com.originacionCredito:originacionCredito:LATEST/process/originacionCredito.Originacion/start`;
        const headers = {
            'Accept': 'application/json'
        };
        console.log(urlIniciar);
        request.post({
            url: urlIniciar,
            headers: headers
        }, function(error, response, body) {

            //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
            console.log('GET /instancia/iniciar');
            res.status(200).send(body);
        });

    };

    exports.avanzarInstancia = (req, res) => {
        const idTarea = req.params.id;
        const user = req.params.user;
        const pass = req.params.pass;
        const urlStart = `http://${user}:${pass}@${baseUrl}/rest/task/${idTarea}/start`;
        const urlComplete = `http://${user}:${pass}@${baseUrl}/rest/task/${idTarea}/complete`;
        const headers = {
            'Accept': 'application/json'
        };

        request.post({
            url: urlStart,
            headers: headers
        }, function(error, response, body) {

            //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
            console.log('GET /instancia/avanzar');
            completar();
        });

        const completar = () => {
            request.post({
                url: urlComplete,
                headers: headers
            }, function(error, response, body) {
                //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
                console.log('GET /instancia/avanzar');
                res.status(200).jsonp({
                    mensaje: "instancia avanzada"
                });
            });
        };
    };


    exports.señalInstancia = (req, res) => {
        const signal = req.params.signal;
        const id = req.params.id;
        const event = req.params.event;
        const urlSignal = 'http://' + req.params.user + ':' + req.params.pass + `@${baseUrl}/rest/runtime/com.originacionCredito:originacionCredito:LATEST/process/instance/${id}/signal?signal=${signal}&event=${event}`;
        const headers = {
            'Accept': 'application/json'
        };
        console.log(urlSignal);
        request.post({
            url: urlSignal,
            headers: headers
        }, function(error, response, body) {
            //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
            console.log('GET /instancia/señal');
            res.status(200).send(body);
        });

    };
}());
