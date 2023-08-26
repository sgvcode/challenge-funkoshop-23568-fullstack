const { conn } = require('../config/conn');

const getAll = async () => {
    try {
        const [rows] = await conn.query('SELECT * FROM product;');
        return rows;
    } catch (e) {
        const error = {
            isError: true,
            message: `No pudimos recuperar los datos por: ${e}`
        }
        return error;
    }
};

module.exports = {
    getAll,
}