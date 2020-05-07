'use strict';

const User = require('../models/User');

module.exports = {
    async get (){
        const users = await User.find('name email');
        return users;
    },

    async create (data){
        await User.create(data);
    }
}