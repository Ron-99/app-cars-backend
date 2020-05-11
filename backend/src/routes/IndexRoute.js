'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).send({
        title: "API Vehicles",
        version: "1.0.0",
        author: 'Ronaldo Gomes',
        github: 'github.com/ron17'
    });
});

module.exports = router;