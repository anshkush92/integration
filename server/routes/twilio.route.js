const router = require('express').Router();

const {
  sendOtp,
  verifyOtp,
  refreshToken,
} = require('../controllers/twilio/twilio.controller');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/refresh-token', refreshToken);

module.exports = router;
