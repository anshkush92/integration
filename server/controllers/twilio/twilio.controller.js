/**
 * @description - Twilio Controller
 * @routes - /twilio/send-sms
 * @dependencies - twilio, dotenv
 * @env - ACCOUNT_SID, TWILIO_AUTH_TOKEN, JWT_AUTH_TOKEN, JWT_REFRESH_TOKEN
 */
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const SMS_SECRET_KEY = process.env.SMS_SECRET_KEY;

const client = require('twilio')(ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const crypto = require('crypto');

// POST /twilio/send-sms
const sendSms = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  // Logic to send the random 6 digit otp to the user's phone number
  const otp = Math.floor(100000 + Math.random() * 900000);
  // Make sure that the otp stays in the memory for 5 minutes
  const ttl = 5 * 60 * 1000;
  // Otp is stored in the mongodb database, and removed after 5 minutes
  const expiresIn = Date.now() + ttl;
  const data = `${phoneNumber}.${otp}.${expiresIn}`;
  // Creates the hash of the data that is given ---> CNS
  const hash = crypto
    .createHmac('sha256', SMS_SECRET_KEY)
    .update(data)
    .digest('hex');
  // The full hash is created by combining the hash and the expiresIn
  const fullHash = `${hash}.${expiresIn}`;

  // Send the sms to the user's phone number
  try {
    const sms = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+17727581109',
      to: phoneNumber,
    });
    console.log('🚀 ~ file: twilio.controller.js:41 ~ sendSms ~ sms', sms);
  } catch (error) {
    console.log('Error sending sms', error);
  }

  return res.status(200).json({
    message: 'Twilio message sent route ----> /twilio/send-sms',
    phoneNumber,
    otp,
    fullHash,
  });
};

module.exports = { sendSms };
