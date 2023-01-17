import { useState } from 'react';

const OtpForm = ({ handleOtpVerify, otpVerifyData, setOtpVerifyData }) => {
  const [currentOtp, setCurrentOtp] = useState('');

  const handleOtpChange = (event) => {
    setCurrentOtp(event.target.value);
    setOtpVerifyData({ ...otpVerifyData, otp: parseInt(event.target.value) });
  };

  return (
    <div className="w-[35rem]  bg-blue-300 p-4 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl">Enter the OTP to login</h2>
      <form
        id="otp-form-submit"
        onSubmit={(event) => handleOtpVerify(event, currentOtp)}
      >
        <label htmlFor="otp">OTP</label>
        <input
          className="input-form mb-4"
          value={currentOtp}
          onChange={(event) => handleOtpChange(event)}
          id="otp"
        />

        <div className="flex gap-x-8">
          <button
            type="button"
            id="otp-form-back"
            onClick={(event) => handleOtpVerify(event, currentOtp)}
            className="w-full py-2 rounded-md bg-red-500 "
          >
            Back
          </button>
          <button type="submit" className="w-full py-2 rounded-md bg-red-500 ">
            Verfiy OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
