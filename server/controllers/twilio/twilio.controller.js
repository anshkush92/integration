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

/**
 * @function sendOtp - Sending the otp to the entered phone number
 * @route {POST} - /twilio/send-otp
 * @body - phoneNumber
 * @description - Takes the {phoneNumber} as {input}, then creates the hash of the {data} using the {SMS_SECRET_KEY}
 * @returns {Object} - {message: "", phoneNumber, otp, fullHash}
 */
const sendOtp = async (req, res) => {
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

  // Sending / Adding this full hash to the body
  req.body.fullHash = fullHash;

  // Send the sms to the user's phone number
  try {
    const sms = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+17727581109',
      to: phoneNumber,
    });
    console.log('🚀 ~ file: twilio.controller.js:41 ~ sendOtp ~ sms', sms);
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

/**
 * @route POST -  /twilio/verify-otp
 * @function sendOtp - Sending the otp to the entered phone number
 * @body - phoneNumber, otp, fullHash
 * @description - Takes {phoneNumber, otp} as {input}, getting {fullHash} from the {body}, destructing it, then checking whether {otp} has been entered within {5 minutes} or not, then creating the {hash} and comparing it with the {calculatedHash}
 */
const verifyOtp = async (req, res) => {
  // Getting these data from the Request
  const phoneNumber = req.body?.phoneNumber;
  const otp = req.body?.otp;
  // Previuosly send this data
  const fullHash = req.body?.fullHash;
  // Extracting the hash and the expiresIn from the fullhash
  let [hash, expiresIn] = fullHash.split('.');
  // Calculating the otp entering time
  let enteredOtpTime = Date.now();

  if (enteredOtpTime > parseInt(expiresIn)) {
    return res.status(500).json({
      message:
        'OTP entered after 5 minutes, please try again, and enter within 5 minutes',
    });
  }

  // Creating the new hash and checking it with the previous hash
  const data = `${phoneNumber}.${otp}.${expiresIn}`;
  // Creates the hash of the data that is given ---> CNS
  const calculatedHash = crypto
    .createHmac('sha256', SMS_SECRET_KEY)
    .update(data)
    .digest('hex');

  if (calculatedHash === hash) {
    return res.status(202).json({
      message: 'OTP is correct',
      verification: true,
      phoneNumber,
      otp,
      fullHash,
    });
  } else {
    return res.status(400).json({
      message: 'OTP is wrong',
      verification: false,
      phoneNumber,
      otp,
      fullHash,
    });
  }
};

module.exports = { sendOtp, verifyOtp };
