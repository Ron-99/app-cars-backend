'use strict';
const express = require('express');
const router = express.Router();

const VehicleController = require('../controllers/VehicleController');

router.get('/', VehicleController.get);
router.get('/brand', VehicleController.getByBrand);
router.get('/:id', VehicleController.getById);
router.post('/', VehicleController.create);
router.put('/:id', VehicleController.update);
router.patch('/:id', VehicleController.updateBySomeFields);
router.delete('/:id', VehicleController.delete);

module.exports = router;