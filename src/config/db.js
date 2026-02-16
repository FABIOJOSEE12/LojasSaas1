const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'criador_lojas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL Database');
        connection.release();
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
    }
};

checkConnection();

module.exports = {
    query: async (sql, params) => {
        const [results, ] = await pool.execute(sql, params);
        return { rows: results }; // Adapter to keep compatibility with existing code expectation of { rows: [] }
    },
    pool
};
