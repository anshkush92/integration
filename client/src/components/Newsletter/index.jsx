import { useState } from 'react';

const SEVER_REQUEST_URL = process.env.REACT_APP_REQUEST_URL;
const Newsletter = () => {
  const [enteredEmail, setEnteredEmail] = useState('');

  const handleNewsletterForm = async (event) => {
    event.preventDefault();
    const response = await fetch(`${SEVER_REQUEST_URL}/sendgrid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: enteredEmail }),
    });

    const data = await response.json();
    console.log('🚀 ~ file: index.jsx:18 ~ handleNewsletterForm ~ data', data);
  };

  return (
    <div className="relative flex">
      <form
        className="w-full"
        onSubmit={(event) => handleNewsletterForm(event)}
      >
        <div className="text-xl">Subscribe to the Newsletter</div>
        <input
          className="input-form"
          type="email"
          value={enteredEmail}
          onChange={(event) => setEnteredEmail(event.target.value)}
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
