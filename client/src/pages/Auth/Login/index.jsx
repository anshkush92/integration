import { useState } from 'react';
import LoginPhone from '../../../components/AuthForm/LoginPhone';
import OtpForm from '../../../components/AuthForm/Otp';

const REQUEST_URL = process.env.REACT_APP_REQUEST_URL;

const LoginPage = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);

  const handleOtpSend = async (event, currentPhoneNumber) => {
    event.preventDefault();
    const response = await fetch(`${REQUEST_URL}/twilio/send-otp`, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber: currentPhoneNumber }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('🚀 ~ file: index.jsx:20 ~ handleOtpSend ~ data', data);

    setIsOtpSend(true);
  };

  const handleOtpVerify = (event, currentOtp) => {
    console.log(
      '🚀 ~ file: index.jsx:16 ~ handleOtpVerify ~ currentOtp',
      currentOtp
    );
    event.preventDefault();
    if (event.target.id === 'otp-form-back') setIsOtpSend(false);
  };

  return (
    <div>
      {isOtpSend ? (
        <OtpForm handleOtpVerify={handleOtpVerify} />
      ) : (
        <LoginPhone handleOtpSend={handleOtpSend} />
      )}
    </div>
  );
};

export default LoginPage;
