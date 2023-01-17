const router = require('express').Router();

const { sendSms } = require('../controllers/twilio/twilio.controller');

router.post('/twilio/send-sms', sendSms);

module.exports = router;
