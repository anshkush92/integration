import { useState } from 'react';
import LoginPhone from '../../../components/AuthForm/LoginPhone';
import OtpForm from '../../../components/AuthForm/Otp';

const LoginPage = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);

  const handleOtpSend = (event, currentPhoneNumber) => {
    event.preventDefault();
    console.log('🚀 ~ file: index.jsx:9 ~ handleOtpSend ~ event', event);
    console.log(currentPhoneNumber);
    setIsOtpSend(true);
  };

  const handleOtpVerify = (event, currentOtp) => {
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
