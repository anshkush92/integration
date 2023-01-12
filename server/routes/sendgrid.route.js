const router = require('express').Router();

const { sendEmail } = require('../controllers/sendgrid/sendgrid.controller');

router.post('/sendgrid', sendEmail);

module.exports = router;
