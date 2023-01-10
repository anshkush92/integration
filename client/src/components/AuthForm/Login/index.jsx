import React from 'react';

const LoginForm = () => {
  return (
    <div className="w-[30rem]  bg-blue-300 p-4 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl">Enter your details to Login</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="input-form mb-4"
          name="email"
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input-form mb-4"
          name="password"
          id="password"
        />

        <button type="submit" className="w-full py-2 rounded-md bg-red-500 ">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
