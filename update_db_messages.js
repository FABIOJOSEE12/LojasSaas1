const db = require('./src/config/db');

async function addColumn() {
    try {
        await db.pool.query("ALTER TABLE messages ADD COLUMN site_id INT DEFAULT NULL");
        await db.pool.query("ALTER TABLE messages ADD CONSTRAINT fk_messages_site FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE SET NULL");
        console.log("Column site_id added to messages table.");
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column site_id already exists.");
        } else {
            console.error("Error adding column:", err);
        }
    }
    process.exit();
}

addColumn();
