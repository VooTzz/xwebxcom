const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const { validateLogin } = require('./functions/login');
const { validateSender, addSender } = require('./functions/connectSender');
const { sendBug } = require('./functions/sendBug');
const { isAuthenticated, isSenderConnected } = require('./functions/middleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'vios_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));

// ROUTES
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const success = await validateLogin(username, password);
  if (success) {
    req.session.user = username;
    res.redirect('/dashboard.html');
  } else {
    res.send('Login gagal. Cek kembali username dan password.');
  }
});

app.post('/connect-sender', isAuthenticated, (req, res) => {
  const { senderId } = req.body;
  if (senderId) {
    addSender(req.session.user, senderId);
    res.send('✅ Sender terhubung.');
  } else {
    res.status(400).send('Sender ID diperlukan.');
  }
});

app.post('/send-bug', isAuthenticated, isSenderConnected, (req, res) => {
  const { target, type } = req.body;
  sendBug(target, type);
  res.send(`🚨 Bug "${type}" berhasil dikirim ke ${target}`);
});

app.listen(3000, () => {
  console.log('Server aktif di http://localhost:3000');
});
