'use strict';

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

require('dotenv/config');

const app = express();
app.use(express.json());

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

requireDir('./models');
//require('./src/destroy');

app.use('/api', routes);

app.listen(PORT, console.log(`listening on port ${PORT}`));