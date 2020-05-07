'use strict';

const User = require('../models/User');

module.exports = {
    async get (){
        const users = await User.find({}, 'name email');
        return users;
    },

    async getById (id){
        const user = await User.findOne({id: id}, 'name email');
        return user;
    },

    async create (data){
        await User.create(data);
    },

    async authenticate (data) {
        const user = await User.findOne({
            email: data.email,
            password: data.password
        });
        return user;
    }
}