const db = require('../config/db');

const createSite = async (site) => {
    const { user_id, template_id, name, content_json, category, colors, logo_url, description, contact_info, social_links, custom_domain } = site;
    const query = `
        INSERT INTO sites (user_id, template_id, name, content_json, category, colors, logo_url, description, contact_info, social_links, custom_domain)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        user_id, 
        template_id, 
        name, 
        JSON.stringify(content_json),
        category,
        JSON.stringify(colors), 
        logo_url,
        description,
        JSON.stringify(contact_info), 
        JSON.stringify(social_links), 
        custom_domain || null
    ];
    
    const [result] = await db.pool.execute(query, values);
    return { id: result.insertId, ...site };
};

const getSitesByUserId = async (user_id) => {
    const query = `
        SELECT sites.*, templates.name as template_name, templates.thumbnail_url 
        FROM sites 
        JOIN templates ON sites.template_id = templates.id 
        WHERE sites.user_id = ? 
        ORDER BY sites.created_at DESC
    `;
    const [rows] = await db.pool.execute(query, [user_id]);
    return rows;
};

const getSiteById = async (id) => {
    const query = `
        SELECT sites.*, templates.html_structure, templates.css_structure 
        FROM sites 
        JOIN templates ON sites.template_id = templates.id 
        WHERE sites.id = ?
    `;
    const [rows] = await db.pool.execute(query, [id]);
    return rows[0];
};

const updateSiteStatus = async (id, status, live_url) => {
    const query = `
        UPDATE sites 
        SET status = ?, live_url = ? 
        WHERE id = ?
    `;
    const values = [status, live_url, id];
    await db.pool.execute(query, values);
    return { id, status, live_url };
};

const getAllSites = async () => {
     const query = `
        SELECT sites.*, users.name as user_name, templates.name as template_name 
        FROM sites 
        JOIN users ON sites.user_id = users.id
        JOIN templates ON sites.template_id = templates.id
        ORDER BY sites.created_at DESC
    `;
    const [rows] = await db.pool.execute(query);
    return rows;
}

const updateSiteContent = async (id, data) => { // For editing
     const { name, category, colors, description, contact_info, social_links } = data;
     const query = `
        UPDATE sites
        SET name = ?, category = ?, colors = ?, description = ?, contact_info = ?, social_links = ?
        WHERE id = ?
     `;
     const values = [
         name, 
         category, 
         JSON.stringify(colors), 
         description, 
         JSON.stringify(contact_info), 
         JSON.stringify(social_links), 
         id
     ];
     await db.pool.execute(query, values);
     return { id, ...data };
}

// New: Delete Site
const deleteSite = async (id) => {
    const query = 'DELETE FROM sites WHERE id = ?';
    await db.pool.execute(query, [id]);
    return { id };
}

module.exports = {
    createSite,
    getSitesByUserId,
    getSiteById,
    updateSiteStatus,
    getAllSites,
    updateSiteContent,
    deleteSite
};
