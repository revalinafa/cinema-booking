const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
require("dotenv").config();

(async () => {
  const c = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await c.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL
        )
    `);

  const [rows] = await c.query("SELECT id FROM users WHERE username = ?", [
    "ahmad",
  ]);
  if (rows.length === 0) {
    const hash = await bcrypt.hash("rahasia123", 10);
    await c.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      ["ahmad", "ahmad@gmail.com", hash],
    );
    console.log("✅ Seed user created: ahmad / rahasia123");
  } else {
    console.log("✅ Seed user already exists");
  }

  await c.end();
  process.exit(0);
})().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
