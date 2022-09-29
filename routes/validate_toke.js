const jwt = require('jsonwebtoken');
const error = {};
const verifyToken = (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        error.error = 'No hay token';
        res.status(401).render('Auth', { error: error.error });
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                error.error = 'Token no valido';
                res.status(401).render('Auth', { error: error.error });
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

module.exports = verifyToken;