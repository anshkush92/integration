const router = require('express').Router();

const { home } = require('../controllers/home/home.controller');

router.get('/', home);

module.exports = router;
