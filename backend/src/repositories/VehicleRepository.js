'use strict';
const Vehicle = require('../models/Vehicle');

module.exports = {
    async get (idUser) {
        const vehicles = await Vehicle.paginate({user: idUser}, {page: 1, limit: 10});
        return vehicles;
    },

    async getByBrand (brand, idUser) {
        const vehicles = await Vehicle.find({brand: brand, user: idUser });
        return vehicles;
    },

    async getById (id, idUser){
        const vehicle = await Vehicle.findOne({id: id, user: idUser});
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