const fetch = require('node-fetch');

const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/username/repo/main/userDB.json';

async function validateLogin(username, password) {
  try {
    const res = await fetch(GITHUB_JSON_URL);
    const users = await res.json();
    return users.some(user => user.username === username && user.password === password);
  } catch (err) {
    console.error('Gagal ambil userDB dari GitHub:', err);
    return false;
  }
}

module.exports = { validateLogin };
