const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'funkoshop',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((error, connection) => {
    if (error) {
        console.error('Hubo un error de conexión: ', error);
    } else {
        console.log('Conexión a la BD fue exitosa.');
        connection.release();
    }
});

module.exports = {
    conn: pool.promise()
};