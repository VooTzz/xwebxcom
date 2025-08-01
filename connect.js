const fs = require('fs');
const path = './db/senderList.json';

function addSender(username, senderId) {
  let data = [];
  if (fs.existsSync(path)) {
    data = JSON.parse(fs.readFileSync(path));
  }
  const updated = data.filter(s => s.username !== username);
  updated.push({ username, senderId, connectedAt: Date.now() });
  fs.writeFileSync(path, JSON.stringify(updated, null, 2));
}

function validateSender(username) {
  if (!fs.existsSync(path)) return false;
  const data = JSON.parse(fs.readFileSync(path));
  return data.some(s => s.username === username);
}

module.exports = { addSender, validateSender };
