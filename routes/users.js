const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { newUser, getUser, getAllUsers} = require('../consultas');
const { verifyToken } = require('../middlewares/auth');

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

router.get('home', verifyToken, async(req, res) => {
    const { data } = req.user;
    const { id } = data;
    if (id === 1) {
       // const orders = await getAllOlderes();
        res.render('Admin', { data: data, orders: orders });
    }else {
        const orders = await getAllOlderes(id);
        res.render('Home', { data: data, orders: orders });
    }

})

module.exports = router;