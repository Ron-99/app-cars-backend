'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authService = require('../services/auth-service');

router.get('/', UserController.get);
router.post('/', UserController.create);
router.post('/authenticate', UserController.authenticate);
router.post('/refresh-token', authService.authorize, UserController.refreshToken);

module.exports = router;