const ACCOUNT_SID = process.env.ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// POST /twilio/send-sms
const sendSms = async (req, res) => {
  return res
    .status(200)
    .json({ message: 'Twilio message sent route ----> /twilio/send-sms' });
};

module.exports = { sendSms };
