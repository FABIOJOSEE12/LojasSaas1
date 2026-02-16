const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.pool.execute('SELECT id, name, email, role, created_at FROM users');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};
