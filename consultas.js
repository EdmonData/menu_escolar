const { Pool } = require('pg');
const pool = new Pool({
    user: 'eduardo',
    host: '192.168.0.111',
    database: 'menu_escolar',
    password: 'calcetin',
    port: 5432,
});

const newUser = async (nombre, email, password) => {
    const crearUsuario = {
    text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
    values: [nombre, email, password],
}
try{
     const { rows } = await pool.query(crearUsuario);
    return rows[0];
} catch (e) {
    throw new Error(e);
}
}

const getUser = async (email, password) => {
    const usuario = {
        text: 'SELECT * FROM users WHERE email = $1 AND password = $2;',
        values: [email, password],
    }
    try{
        const { rows } = await pool.query(usuario);
        return rows[0];
    } catch (e) {
        throw new Error(e);
    }
};

const getAllUsers = async () => {
    const allUsers = 'SELECT * FROM users where users.id > 1;';
    try {
        const { rows } = await pool.query(allUsers);
        return rows;
    } catch (e) {
        throw new Error(e);
    }
};

const getAllOlderes   = async () => {
    const allOrders = 'select * from orders where orders.school_id > 1;';
    try {
        const { rows } = await pool.query(allOrders);
        return rows;
    } catch (e) {
        throw new Error(e);
    }
};

const getOrdersByUser = async (id) => {
    const ordersByUser = {
        text: 'SELECT * FROM orders WHERE school_id = $1;',
        values: [id],
    }
    try {
        const { rows } = await pool.query(ordersByUser);
        return rows;
    } catch (e) {
        throw new Error(e);
    }
};


module.exports = {
    getUser,
    newUser,
    getAllOlderes,
    getOrdersByUser,
    getAllUsers
};