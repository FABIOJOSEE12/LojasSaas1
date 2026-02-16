const db = require('../config/db');

const createTemplate = async (template) => {
    const { name, category, thumbnail_url, html_structure, css_structure } = template;
    const query = `
        INSERT INTO templates (name, category, thumbnail_url, html_structure, css_structure)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [name, category, thumbnail_url, html_structure, css_structure];
    const [result] = await db.pool.execute(query, values);
    return { id: result.insertId, ...template, created_at: new Date() };
};

const getAllTemplates = async () => {
    const query = 'SELECT * FROM templates ORDER BY created_at DESC';
    const [rows] = await db.pool.execute(query);
    return rows;
};

const getTemplateById = async (id) => {
    const query = 'SELECT * FROM templates WHERE id = ?';
    const [rows] = await db.pool.execute(query, [id]);
    return rows[0];
};

module.exports = {
    createTemplate,
    getAllTemplates,
    getTemplateById,
};
