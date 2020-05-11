'use strict';
const Vehicle = require('../models/Vehicle');

module.exports = {
    async get (idUser, page) {
        const vehicles = await Vehicle.paginate({user: idUser}, {page: page, limit: 10});
        return vehicles;
    },

    async getByBrand (brand, idUser, page) {
        const vehicles = await Vehicle.paginate({brand: brand, user: idUser}, {page: page, limit: 10});
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
        const vehicle = await Vehicle.findOneAndUpdate({id: id}, data, {new: true});
        return vehicle;
    },

    async updateBySomeFields (id, data){
        await Vehicle.findOneAndUpdate({id: id}, data);
    },

    async delete (id) {
        await Vehicle.findOneAndRemove({id: id});
    }
}