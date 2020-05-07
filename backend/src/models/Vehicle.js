'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const VehicleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    vehicle: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

VehicleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Vehicle', VehicleSchema);