const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { getUser, getAllOlderes, getOrdersByUser, getAllUsers } = require('../consultas');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { emailLogin, passwordLogin } = req.body;
    const user = await getUser(emailLogin, passwordLogin);
    if (user) {
             const data = { id: user.id, email: user.email, nombre: user.name };
            const token = jwt.sign({ data } , process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.send(token);
       } else {
            res.status(404).send({ 
                error: 'Usuario no encontrado',
                code: 404
            });
        }
    });



module.exports = router;