const db = require('../config/db');

const createUser = async (name, email, passwordHash, role = 'client') => {
    const query = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
    `;
    const values = [name, email, passwordHash, role];
    const [result] = await db.pool.execute(query, values);
    
    // MySQL returns insertId
    return { id: result.insertId, name, email, role, created_at: new Date() };
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.pool.execute(query, [email]);
    return rows[0];
};

const findUserById = async (id) => {
    const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
    const [rows] = await db.pool.execute(query, [id]);
    return rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};
