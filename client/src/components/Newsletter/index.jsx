import React from 'react';

const Newsletter = () => {
  return (
    <div className="relative flex">
      <form className="w-full">
        <div className="text-xl">Subscribe to the Newsletter</div>
        <input
          name="newsletter-email"
          id="email"
          className="input-form"
          type="email"
          placeholder="Enter your email to subscribe"
        />
        <button
          type="submit"
          className="bg-red-500 w-80 rounded-sm absolute right-0 px-4 py-2"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
