const router = require('express').Router();
const { ruleset } = require('@hapi/joi/lib/base');
const jwt = require('jsonwebtoken');

const { newUser, getUser, getAllUsers, getAllOlderes ,getOrdersByUser} = require('../consultas');
const { verifyToken } = require('./validate_toke');

router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const usuario = await newUser( nombre, email, password );
        res.status(201).send(usuario);
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal ${e}`,
            code:500
        });
    } 
});

router.get('/registro', (req, res) => {
    res.render('Registro');
});

router.get('/home',  async(req, res) => {
    const { data } = req.user;
    if (data.id === 1 ){
        const orders = await getAllOlderes();
        const users = await getAllUsers(data.id);
        res.render('Admin',{ data: data, orders: orders, users: users });
    } else {
    const orders = await getOrdersByUser(data.id);
    res.render('Home', { data: data, orders: orders });
    }
});

module.exports = router;