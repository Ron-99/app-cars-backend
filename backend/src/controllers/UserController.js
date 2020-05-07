'use strict';

const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/UserRepository');
const md5 = require('md5');
const authService = require('../services/auth-service');

module.exports = {
    async get (_, res){
        try{
            const users = await repository.get();
            res.status(200).send(users);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getById (req, res){
        try{
            const user = await repository.getById(req.params.id);
            res.status(200).send(user);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },
    
    async create (req, res) {
        const contract = new ValidationContract();
        contract.isRequired(req.body.id, 'O id do usuário deve ser informado');
        contract.isRequired(req.body.name, 'O nome do usuário deve ser informado');
        contract.isRequired(req.body.email, 'O e-mail do usuário deve ser informado');
        contract.isEmail(req.body.email, 'E-mail inválido');
        contract.isRequired(req.body.password, 'A senha do usuário deve ser informada');
        contract.hasMinLen(req.body.password, 6, 'A senha deve ter no minimo 6 caracteres');

        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return;
        }

        try{
            await repository.create({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password)
            });
            res.status(201).send({
                message: 'Usuário criado com sucesso!'
            });
        }catch(e){
            if(e.code === 11000){
                res.status(400).send({
                    message: 'Esse usuário já existe'
                });
            }else{
                res.status(400).send({
                    message: 'Falha ao processar sua requisição'
                });
            }
        }
    },

    async authenticate (req, res) {
        const contract = new ValidationContract();
        contract.isRequired(req.body.email, 'O e-mail do usuário deve ser informado');
        contract.isEmail(req.body.email, 'E-mail inválido');
        contract.isRequired(req.body.password, 'A senha do usuário deve ser informada');
        contract.hasMinLen(req.body.password, 6, 'A senha deve ter no minimo 6 caracteres');

        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return;
        }

        try {
            const user = await repository.authenticate({
                email: req.body.email,
                password: md5(req.body.password)
            });

            if(!user){
                res.status(404).send({
                    message: 'Usuário ou senha inválidos'
                    
                });
                return;
            }
            
            const token = await authService.generateToken({
                email: user.email, 
                name: user.name
            });

            res.status(201).send({
                token: token,
                data: {
                    email: user.email,
                    name: user.name
                }
            });
            
        }catch(e){
            if(e.code === 11000){
                res.status(400).send({
                    message: 'Esse usuário já existe'
                });
            }else{
                res.status(400).send({
                    message: 'Falha ao processar sua requisição'
                });
            }
        }
    }
}