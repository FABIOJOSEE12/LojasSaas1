const db = require('./src/config/db');

async function testInsert() {
    try {
        const query = `
            INSERT INTO sites (user_id, template_id, name, content_json, category, colors, logo_url, description, contact_info, social_links, custom_domain)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            1, // Assuming admin user exists with ID 1
            1, // Assuming template ID 1 exists
            'Test Site', 
            '{}',
            'Loja Virtual',
            '{"primary":"#000"}', 
            'http://logo.com',
            'Desc',
            '{"email":"test@test.com"}', 
            '{"instagram":"test"}', 
            null
        ];
        
        await db.pool.execute(query, values);
        console.log("Insert successful!");
    } catch (err) {
        console.error("Insert failed:", err.message);
    }
    process.exit();
}

testInsert();
