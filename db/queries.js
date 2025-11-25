const pool = require("./pool");

async function createUser(username, hashedPassword) {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );
  return result.rows[0];
}

async function findUserByUsername(username) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

async function getAllMessages() {
  const result = await pool.query(`
    SELECT messages.*, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY created_at DESC`);
  return result.rows;
}

async function createMessage(userid, title, body) {
  const result = await pool.query(
    `
    INSERT INTO messages (user_id, title, body, created_at)
    VALUES ($1, $2, $3, NOW() RETURNING *)`,
    [userid, title, body]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  getAllMessages,
  createMessage,
};
