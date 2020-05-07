'use strict';

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
require('dotenv/config');

// Carrega as Rotas
const vehicleRoute = require('./routes/VehicleRoute');
const userRoute = require('./routes/UserRoute');

// Porta
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Conecta ao banco
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// Carrega os Models 
requireDir('./models');

app.use('/vehicles', vehicleRoute);
app.use('/users', userRoute);

app.listen(PORT, console.log(`listening on port ${PORT}`));