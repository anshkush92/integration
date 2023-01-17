import React from 'react';

const OtpForm = () => {
  return (
    <div className="w-[35rem]  bg-blue-300 p-4 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl">Enter the OTP to login</h2>
      <form>
        <label htmlFor="otp">OTP</label>
        <input className="input-form mb-4" id="otp" />

        <button type="submit" className="w-full py-2 rounded-md bg-red-500 ">
          Verfiy OTP
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
