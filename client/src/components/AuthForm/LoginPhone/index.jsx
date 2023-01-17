import { useState } from 'react';

const LoginPhone = ({ handleOtpSend }) => {
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');

  return (
    <div className="w-[35rem]  bg-blue-300 p-4 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl">Enter your phone Number to Login</h2>
      <form onSubmit={(event) => handleOtpSend(event, currentPhoneNumber)}>
        <label htmlFor="phone-number">Phone Number</label>
        <input
          className="input-form mb-4"
          onChange={(event) => setCurrentPhoneNumber(event.target.value)}
          value={currentPhoneNumber}
          id="phone-number"
        />

        <button type="submit" className="w-full py-2 rounded-md bg-red-500 ">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default LoginPhone;
