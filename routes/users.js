const router = require('express').Router();
const { ruleset } = require('@hapi/joi/lib/base');
const jwt = require('jsonwebtoken');

const { newUser, getUser, getAllUsers, getAllOlderes ,getOrdersByUser} = require('../consultas');
const { verifyToken } = require('./validate_toke');


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

router.get('/newPedido', (req, res) => {
    const { data } = req.user;
    res.render('Pedido', { data: data });
});

module.exports = router;