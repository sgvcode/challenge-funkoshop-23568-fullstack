const { conn } = require('../config/conn');

const getAll = async () => {
    const [rows] = await conn.query('SELECT * FROM product;');

    return rows;
};

module.exports = {
    getAll
}

