const { validateSender } = require('./connectSender');

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).send('Login dulu.');
  }
}

function isSenderConnected(req, res, next) {
  if (validateSender(req.session.user)) {
    next();
  } else {
    res.status(403).send('Sender belum terkoneksi.');
  }
}

module.exports = { isAuthenticated, isSenderConnected };
