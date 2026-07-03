const db = require("../config/database");
const bcrypt = require("bcrypt");

class Auth {
  static async register(username, email, password) {
    if (!username || username.trim() === "")
      throw new Error("Username wajib diisi");
    if (!email || email.trim() === "") throw new Error("Email wajib diisi");
    if (!password || password.length < 6)
      throw new Error("Password minimal 6 karakter");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Format email tidak valid");

    // Cek username sudah dipakai
    const [exist] = await db.query(
      "SELECT id FROM users WHERE username = ? AND deleted_at IS NULL LIMIT 1",
      [username],
    );
    if (exist.length > 0) throw new Error("Username sudah terdaftar");

    // Cek email sudah dipakai
    const [existEmail] = await db.query(
      "SELECT id FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1",
      [email],
    );
    if (existEmail.length > 0) throw new Error("Email sudah terdaftar");

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;
    const [result] = await db.query(sql, [username, email, hashedPassword]);

    return { id: result.insertId, username, email };
  }

  static async login(username, password) {
    if (!username || username.trim() === "")
      throw new Error("Username wajib diisi");
    if (!password) throw new Error("Password wajib diisi");

    const sql = `
            SELECT id, username, email, password
            FROM users
            WHERE username = ?
            AND deleted_at IS NULL
            LIMIT 1
        `;
    const [rows] = await db.query(sql, [username]);
    if (!rows[0]) return null;

    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) return null;

    return { id: rows[0].id, username: rows[0].username, email: rows[0].email };
  }

  static async findById(id) {
    const [rows] = await db.query(
      "SELECT id, username, email FROM users WHERE id = ? AND deleted_at IS NULL LIMIT 1",
      [id],
    );
    return rows[0] || null;
  }
}

module.exports = Auth;
