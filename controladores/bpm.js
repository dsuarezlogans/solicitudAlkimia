(function() {
  'use strict';

  const tareas = require('../rest-client/bpm');


  exports.tareasBpm = (req, res) => {
    const Tareas = tareas.listaTareas(req.params.user,req.params.pass);
          console.log('GET /tareas');
          if(Tareas.length <= 0) return res.status(200).send({"mensaje":"No hay tareas disponible"});                   
          res.status(200).send(Tareas);
  };
}());
