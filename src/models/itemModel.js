const { conn } = require('../config/conn');

const getAll = async () => {
    try {
        const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id;');
        const response = {
            isError: false,
            data: rows
        };

        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No pudimos recuperar los datos ${e}.`
        };

        return error;
    } finally {
        await conn.releaseConnection();
    }
}

const getOne = async (params) => {
    try {
        const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id WHERE ?;', params);
        const response = {
            isError: false,
            data: rows
        };

        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No pudimos recuperar los datos.`
        };

        return error;
    } finally {
        await conn.releaseConnection();
    }
}


module.exports = {
    getAll,
    getOne,
}