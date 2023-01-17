const router = require('express').Router();

const {
  sendOtp,
  verifyOtp,
} = require('../controllers/twilio/twilio.controller');

router.post('/twilio/send-otp', sendOtp);
router.post('/twilio/verify-otp', verifyOtp);

module.exports = router;
