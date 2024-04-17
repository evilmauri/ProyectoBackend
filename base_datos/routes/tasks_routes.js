//importamos la libreria express
const express = require('express');
let TasksController = require('../controllers/tasks');

let router = express.Router();

//tipos de coleccion, lectura de la coleccion mediante GET la cual se enviara la peticion
router.route('/tasks').get(TasksController.index).post(TasksController.create);
    //cuando se ejecuta mediante POST se realizara a la carpeta /tasks

router.get('/tasks/new',TasksController.new);

router.get('/tasks/:id/edit',TasksController.edit);

router.route('/tasks/:id')
    .get(TasksController.show)
    .put(TasksController.update) //Un JOKER(comodin) wildcard
    .delete(TasksController.destroy);

module.exports = router;