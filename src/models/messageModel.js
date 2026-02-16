const db = require('../config/db');

const createMessage = async (user_id, site_id, subject, message) => {
    // site_id can be null if not related to a site
    const query = 'INSERT INTO messages (user_id, site_id, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await db.pool.execute(query, [user_id, site_id, subject, message]);
    return { id: result.insertId, user_id, site_id, subject, message };
};

const getMessagesByUserId = async (user_id) => {
    const query = 'SELECT * FROM messages WHERE user_id = ? ORDER BY created_at DESC';
    const [rows] = await db.pool.execute(query, [user_id]);
    return rows;
};

const getAllMessages = async () => {
    const query = `
        SELECT messages.*, users.name as user_name, users.email as user_email, sites.name as site_name 
        FROM messages 
        JOIN users ON messages.user_id = users.id
        LEFT JOIN sites ON messages.site_id = sites.id
        ORDER BY messages.created_at DESC
    `;
    const [rows] = await db.pool.execute(query);
    return rows;
};

module.exports = {
    createMessage,
    getMessagesByUserId,
    getAllMessages
};
