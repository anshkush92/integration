const router = require('express').Router();

const { login, register } = require('../controllers/auth/auth.controller');

router.get('/login', login);
router.post('/login', login);

router.get('/register', register);
router.post('/register', register);

module.exports = router;
