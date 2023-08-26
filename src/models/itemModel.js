const { conn } = require('../config/conn');

const getAll = async () => {
    try {
        const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id;');

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