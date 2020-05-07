'use strict';
const Vehicle = require('../models/Vehicle');

module.exports = {
    async get () {
        const vehicles = await Vehicle.paginate({}, {page: 1, limit: 10});
        return vehicles;
    },

    async getByBrand (brand) {
        const vehicles = await Vehicle.find({brand: brand });
        return vehicles;
    },

    async getById (id){
        const vehicle = await Vehicle.findOne({id: id});
        return vehicle;
    },

    async create (data) {
        await Vehicle.create(data);
    },

    async update (id, data) {
        await Vehicle.findOneAndUpdate({id: id}, data);
    },

    async updateBySomeFields (id, data){
        await Vehicle.findOneAndUpdate({id: id}, data);
    },

    async delete (id) {
        await Vehicle.findOneAndRemove({id: id});
    }
}