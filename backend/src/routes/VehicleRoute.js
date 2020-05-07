'use strict';
const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/VehicleController');
const authService = require('../services/auth-service');

router.get('/', VehicleController.get);
router.get('/brand', VehicleController.getByBrand);
router.get('/:id', VehicleController.getById);
router.post('/', authService.authorize, VehicleController.create);
router.put('/:id', authService.authorize, VehicleController.update);
router.patch('/:id', authService.authorize, VehicleController.updateBySomeFields);
router.delete('/:id', authService.authorize, VehicleController.delete);

module.exports = router;