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

  return (
    <div>
      {isOtpSend ? <OtpForm /> : <LoginPhone handleOtpSend={handleOtpSend} />}
    </div>
  );
};

export default LoginPage;
