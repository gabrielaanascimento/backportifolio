const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);

async function getUserByUsername(username) {
  const users = await sql`SELECT * FROM users WHERE username = ${username}`;
  return users[0];
}

module.exports = { getUserByUsername };
