import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPhone from '../../../components/AuthForm/LoginPhone';
import OtpForm from '../../../components/AuthForm/Otp';

const REQUEST_URL = process.env.REACT_APP_REQUEST_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [otpVerifyData, setOtpVerifyData] = useState('');

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
    setOtpVerifyData(data);
    console.log('🚀 ~ file: index.jsx:20 ~ handleOtpSend ~ data', data);

    setIsOtpSend(true);
  };

  const handleOtpVerify = async (event, currentOtp) => {
    event.preventDefault();
    setOtpVerifyData({ ...otpVerifyData, otp: parseInt(currentOtp) });
    if (event.target.id === 'otp-form-back') {
      setIsOtpSend(false);
    } else {
      const response = await fetch(`${REQUEST_URL}/twilio/verify-otp`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(otpVerifyData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(
        '🚀 ~ file: index.jsx:28 ~ handleOtpVerify ~ otpVerifyData',
        otpVerifyData
      );

      const data = await response.json();

      if (data?.verification === true) {
        navigate('/');
      }

      console.log('🚀 ~ file: index.jsx:46 ~ handleOtpVerify ~ data', data);
    }
  };

  return (
    <div>
      {isOtpSend ? (
        <OtpForm
          handleOtpVerify={handleOtpVerify}
          otpVerifyData={otpVerifyData}
          setOtpVerifyData={setOtpVerifyData}
        />
      ) : (
        <LoginPhone handleOtpSend={handleOtpSend} />
      )}
    </div>
  );
};

export default LoginPage;
