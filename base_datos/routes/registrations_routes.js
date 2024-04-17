const express = require('express');
//importamos la libreria express

let RegistrationsController = require('../controllers/registrations');
let router = express.Router();
//con el cual registramos la ruta
router.get('/signup',RegistrationsController.new);

router.route('/users').post(RegistrationsController.create);

module.exports = router;

