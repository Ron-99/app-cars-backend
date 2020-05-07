'use strict';
const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', UserController.get);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.post('/authenticate', UserController.authenticate);

module.exports = router;