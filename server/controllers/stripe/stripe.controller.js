const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 8000;
console.log('🚀 ~ file: stripe.controller.js:4 ~ PORT', PORT);
const CLIENT_URL = process.env.CLIENT_URL;
console.log('🚀 ~ file: stripe.controller.js:6 ~ CLIENT_URL', CLIENT_URL);

const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:${PORT}/success`,
    cancel_url: `http://localhost:${PORT}/cancel`,
  });

  res.redirect(303, session.url);
};

const success = async (req, res) => {
  res.status(200).json({ message: 'Success!' });
};

const cancel = async (req, res) => {
  res.status(200).json({ message: 'Cancel!' });
};

module.exports = { createCheckoutSession, success, cancel };
