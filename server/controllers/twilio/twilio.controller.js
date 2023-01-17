/**
 * @description - Twilio Controller
 * @routes - /twilio/send-sms
 * @dependencies - twilio, dotenv, crypto, jsonwebtoken, cookieParser
 * @env - ACCOUNT_SID, TWILIO_AUTH_TOKEN, JWT_AUTH_TOKEN, JWT_REFRESH_TOKEN
 */
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const SMS_SECRET_KEY = process.env.SMS_SECRET_KEY;

const client = require('twilio')(ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

/**
 * @function `sendOtp` - Sending the otp to the entered phone number
 * @route `POST` - /twilio/send-otp
 * @body - `phoneNumber`
 * @description - Takes the {phoneNumber} as {input}, then creates the hash of the {data} using the {SMS_SECRET_KEY}
 * @returns {Object} - message: "", phoneNumber, otp, fullHash
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
 * @route `POST` -  /twilio/verify-otp
 * @function `sendOtp`` - Sending the otp to the entered phone number
 * @body - `phoneNumber`, `otp`, `fullHash`
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
    /**
     * @tutorial {shorturl.at/fhGMT} - JWT Flow
     */
    // Creating the access token and sending data to the client
    const accessToken = jwt.sign({ phoneNumber }, JWT_AUTH_TOKEN, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign({ phoneNumber }, JWT_REFRESH_TOKEN, {
      expiresIn: '1y',
    });

    refreshTokens.push(refreshToken);
    return res
      .status(202)
      .cookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      })
      .cookie('authSession', true, {
        expires: new Date(new Date().getTime() + 30 * 1000),
      })
      .cookie('refreshToken', refreshToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      })
      .cookie('refreshTokenId', true, {
        expires: new Date(new Date().getTime() + 30 * 1000),
      })
      .json({
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

/**
 * @route `POST` -  /twilio/refresh-token
 * @function `refreshToken` - Refreshing the access token
 * @body `refreshToken`
 * @description - Takes {`refreshToken`} as {`input`}, then checking whether {refreshToken} is present in the {refreshTokens} array or not, then creating the {accessToken} and sending it to the client
 */
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({
      message: 'Refresh Token not found, please login again',
    });
  } else if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      message: 'Refresh Token blocked, please login again',
    });
  }

  jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phoneNumber) => {
    if (!err) {
      const accessToken = jwt.sign({ phoneNumber }, JWT_AUTH_TOKEN, {
        expiresIn: '30s',
      });

      return res
        .status(202)
        .cookie('accessToken', accessToken, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: 'strict',
          httpOnly: true,
        })
        .cookie('authSession', true, {
          expires: new Date(new Date().getTime() + 30 * 1000),
        })
        .json({
          message: 'Access Token refreshed',
          phoneNumber,
          previousSessionExpiry: true,
          sucess: true,
        });
    } else {
      return res.status(403).json({
        message: 'Refresh Token is not valid, please login again',
        success: false,
      });
    }
  });
};

module.exports = { sendOtp, verifyOtp, refreshToken };
