'use strict';

const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/VehicleRepository');
const authService = require('../services/auth-service');

module.exports = {
    async get (_, res) {
        try{
            const vehicle = await repository.get()
            res.status(200).send(vehicle);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getByBrand (req, res) {
        try{
            const vehicles = await repository.getByBrand(req.query.q);
            res.status(200).send(vehicles);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getById (req, res){
        try{
            const vehicle = await repository.getById(req.params.id);
            return res.status(200).send(vehicle);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao prcoessar sua requisição'
            });
        }
    },

    async create (req, res) {
        const contract = new ValidationContract();
        contract.isRequired(req.body.vehicle, 'O Veículo deve ser informado');
        contract.isRequired(req.body.brand, 'A marca do veículo deve ser informada');
        contract.isRequired(req.body.year, 'O ano do veículo deve ser informado');
        contract.hasLen(req.body.year, 4, 'O ano deve conter 4 digitos');
        contract.isInteger(req.body.year, 'O ano deve ser um valor inteiro');

        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return;
        }

        try{
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const data = await authService.decodeToken(token);
            
            await repository.create(req.body);
            res.status(201).send({
                message: 'Veículo criado com sucesso!'
            });
        }catch(e){
            if(e.code === 11000){
                res.status(400).send({
                    message: 'Esse veículo já existe'
                });
            }else{
                res.status(400).send({
                    message: 'Falha ao processar sua requisição'
                });
            }
            
        }
    },

    async update (req, res) {
        const contract = new ValidationContract();
        contract.isRequired(req.body.vehicle, 'O Veículo deve ser informado');
        contract.isRequired(req.body.brand, 'A marca do veículo deve ser informada');
        contract.isRequired(req.body.year, 'O ano do veículo deve ser informado');
        contract.hasLen(req.body.year, 4 ,'O ano deve conter 4 digitos');
        contract.isInteger(req.body.year, 'O ano deve ser um valor inteiro');

        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return;
        }

        try{
            await repository.update(req.query.id, {
                id: req.body.id,
                vehicle: req.body.vehicle,
                brand: req.body.brand,
                year: req.body.year,
                description: req.body.description,
                updated: Date.now()
            });
            res.status(200).send({
                message: 'Veículo atualizado com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async updateBySomeFields (req, res){
        const contract = new ValidationContract();
        contract.isRequired(req.body.vehicle, 'O Veículo deve ser informado');
        contract.isRequired(req.body.brand, 'A marca do veículo deve ser informada');
        contract.isRequired(req.body.year, 'O ano do veículo deve ser informado');
        contract.hasLen(req.body.year, 4,'O ano deve conter 4 digitos');
        contract.isInteger(req.body.year, 'O ano deve ser um valor inteiro');

        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return;
        }

        try{
            await repository.updateBySomeFields(req.params.id, {
                vehicle: req.body.vehicle,
                brand: req.body.brand,
                year: req.body.year,
                updated: Date.now()
            });
            res.status(200).send({
                message: 'Veículo atualizado com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async delete (req, res) {
        try{
            await repository.delete(req.params.id);
            res.status(200).send({
                message: 'Veículo excluido com sucesso'
            });
        }
        catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}