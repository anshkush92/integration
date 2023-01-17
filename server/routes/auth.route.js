const router = require('express').Router();

const {
  login,
  register,
  logout,
} = require('../controllers/auth/auth.controller');
const { route } = require('./twilio.route');

router.get('/login', login);
router.post('/login', login);

router.get('/register', register);
router.post('/register', register);

router.get('/logout', logout);

module.exports = router;
