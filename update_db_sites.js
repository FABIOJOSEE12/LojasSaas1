const db = require('./src/config/db');

async function updateSchema() {
    try {
        await db.pool.query("ALTER TABLE sites ADD COLUMN custom_domain VARCHAR(255) DEFAULT NULL");
        console.log("Column custom_domain added successfully.");
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column custom_domain already exists.");
        } else {
            console.error("Error adding column:", err);
        }
    }
    process.exit();
}

updateSchema();
