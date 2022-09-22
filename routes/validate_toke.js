const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        res.status(401).json({ error: 'Token no encontrado' });
    } else{
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Token no valido' });
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

module.exports = verifyToken;