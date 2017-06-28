(function() {
    'use strict';

    const request = require('request');
    const _ = require('lodash');
    const moment = require('moment');
    const mongoose = require('mongoose');
    const q = require('q');
    const Solicitud = mongoose.model('Solicitud');
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
            _.each(tareasBpm, (value, key) => {
                if (value.status !== 'Completed') {
                    var day = moment(value['created-on']);

                    O.push({
                        idInstancia: value['process-instance-id'],
                        nombreTarea: value.name,
                        idTarea: value.id,
                        fechaInicio: day
                    });
                }
            });

            if (O.length <= 0) return res.status(200).jsonp([{
                mensaje: "no hay tareas disponibles"
            }]);
            function findPromise(o) {
                return new Promise((resolve, reject) => {
                  var a = [];
                  var size = o.length;
                    _.each(o, (value, key) => {
                        Solicitud.findOne({
                            'idInstancia': value.idInstancia
                        }, (err, Sol) => {
                            if (err) return reject(err);
                            let count=0;
                            _.each(O, (value, key) => {
                                if (value.idInstancia === Sol.idInstancia) {
                                    value.solicitud = {};
                                    value.solicitud = Sol;
                                    a.unshift(value);
                                    if(size === a.length) resolve(a);
                                }
                            });
                        });
                    });
                });
            }
            findPromise(O)
                .then((O) => {
                  console.log("GET /tareas");
                    res.jsonp(O);
                })
                .catch((err) => {
                    console.log("An error occurred. Error: ", err);
                });

        });
    };
    exports.iniciarInstancia = (req, res) => {
        const user = req.params.user;
        const pass = req.params.pass;
        const urlIniciar = `http://${user}:${pass}@${baseUrl}/rest/runtime/com.originacionCredito:originacionCredito:LATEST/process/originacionCredito.Originacion/start`;
        const headers = {
            'Accept': 'application/json'
        };
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
        const urlClaim = `http://${user}:${pass}@${baseUrl}/rest/task/${idTarea}/claim`;
        const urlStart = `http://${user}:${pass}@${baseUrl}/rest/task/${idTarea}/start`;
        const urlComplete = `http://${user}:${pass}@${baseUrl}/rest/task/${idTarea}/complete`;
        const headers = {
            'Accept': 'application/json'
        };

        request.post({
            url: urlClaim,
            headers: headers
        }, function(error, response, body) {

            //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
            console.log('GET /instancia/claim');
            iniciar();
        });

        const iniciar = () => {
            request.post({
                url: urlStart,
                headers: headers
            }, function(error, response, body) {

                //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
                console.log('GET /instancia/start');
                completar();
            });
        };

        const completar = () => {
            request.post({
                url: urlComplete,
                headers: headers
            }, function(error, response, body) {
                if (error) return res.status(400).jsonp({
                    mensaje: 'Error al avanzar instancia',
                    error: error
                });
                console.log('GET /instancia/complete');
                res.status(200).jsonp({
                    mensaje: "instancia avanzada"
                });
            });
        };
    };


    exports.modelo = (req, res) => {
        const user = req.params.user;
        const pass = req.params.pass;
        const instancia = req.params.id;
        const urlModelo = `http://${user}:${pass}@${baseUrl}/rest/runtime/com.originacionCredito:originacionCredito:LATEST/process/originacionCredito.Originacion/image/${instancia}`;

        request.get({
            url: urlModelo
        }, function(error, response, body) {
            //if(O.length <= 0) return res.status(400).jsonp({mensaje:'Error al avanzar instancia'});
            console.log('GET /modelo');
            res.status(200).send(body);
        });

    };

    exports.señalInstancia = (req, res) => {
        const signal = req.params.signal;
        const id = req.params.id;
        const event = req.params.event;

        const urlSignal = 'http://' + req.params.user + ':' + req.params.pass + `@${baseUrl}/rest/runtime/com.originacionCredito:originacionCredito:LATEST/process/instance/${id}/signal?signal=${signal}&event="${event}"`;
        const headers = {
            'Accept': 'application/json'
        };
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
