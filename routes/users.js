const router = require('express').Router();

const {getAllUsers, getAllOlderes ,getOrdersByUser, newOrder} = require('../consultas');

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

router.post('/newPedido', async(req, res) => {
    const { data } = req.user;
    const { vegetariano, calorico, celiaco, autoctono, estandar, fecha } = req.body;
    const id = data.id;
    try {
        const pedido = await newOrder(id, vegetariano, calorico, celiaco, autoctono, estandar, fecha);
        res.status(201).send(pedido);
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal ${e}`,
            code:500
        });
    }
});


module.exports = router;