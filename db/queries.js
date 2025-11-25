const pool = require("./pool");

async function createUser(firstName, lastName, email, hashedPassword) {
  const result = await pool.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, hashedPassword]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

async function getAllMessages() {
  const result = await pool.query(`
    SELECT messages.*, users.email
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY created_at DESC`);
  return result.rows;
}

async function createMessage(userid, title, body) {
  const result = await pool.query(
    `
    INSERT INTO messages (user_id, title, body, created_at)
    VALUES ($1, $2, $3, NOW()) 
    RETURNING *`,
    [userid, title, body]
  );
  return result.rows[0];
}

async function updateMembership(userid) {
  await pool.query("UPDATE users SET membership = TRUE WHERE id = $1", [
    userid,
  ]);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllMessages,
  createMessage,
  updateMembership,
};
