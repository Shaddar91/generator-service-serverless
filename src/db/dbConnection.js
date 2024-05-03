const mysql = require('mysql2/promise');

async function createConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}

async function queryDatabase(sql, params) {
    const connection = await createConnection();
    try {
        const [rows, fields] = await connection.execute(sql, params);
        return rows;
    } catch (err) {
        console.error('Database query failed:', err);
        throw err;
    } finally {
        await connection.end();
    }
}

module.exports = {
    queryDatabase
};
