'use strict';

const User = require('../models/User');
const repository = require('../repositories/UserRepository');

module.exports = {
    async get (_, res){
        try{
            const users = await repository.get;
            res.status(200).send(users);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },
    async create (req, res) {
        try{
            await User.create(req.body);
            res.status(201).send({
                message: 'Usuário criado com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}