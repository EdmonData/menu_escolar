const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(30).required().email(),
    password: Joi.string().min(6).max(30).required()
});

const schemaLogin = Joi.object({
    emailLogin: Joi.string().min(6).max(30).required().email(),
    passwordLogin: Joi.string().min(6).max(30).required()
});

const schemaNewOrder = Joi.object({
    vegetariano: Joi.number().min(0).max(1000).required(),
    calorico: Joi.number().min(0).max(1000).required(),
    celiaco: Joi.number().min(0).max(1000).required(),
    autoctono: Joi.number().min(0).max(1000).required(),
    estandar: Joi.number().min(0).max(1000).required(),
    fecha : Joi.date().required()
});


const  rectifyOrder = Joi.object({
    idorder: Joi.number().required(),
    rectifVegetariano: Joi.number().min(0).max(1000).required(),
    rectifCalorico: Joi.number().min(0).max(1000).required(),
    rectifCeliaco: Joi.number().min(0).max(1000).required(),
    rectifAutoctono: Joi.number().min(0).max(1000).required(),
    rectifEstandar: Joi.number().min(0).max(1000).required(),
    observaciones: Joi.string().min(0).max(1000).required()
});


const filtro = Joi.object({
    desde: Joi.date().required(),
    hasta: Joi.date().required(),
    idusers: Joi.number().required()
});


module.exports = { schemaRegister, schemaLogin, schemaNewOrder, rectifyOrder, filtro };