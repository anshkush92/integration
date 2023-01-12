const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;

const createCheckoutSession = async (req, res) => {
  const cartItems = req.body?.cartItems;
  const lineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  console.log(
    '🚀 ~ file: stripe.controller.js:8 ~ createCheckoutSession ~ cartItems',
    cartItems,
    lineItems
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${CLIENT_URL}/success`,
    cancel_url: `${CLIENT_URL}/cancel`,
  });

  res.status(200).json({ url: session.url, cartItems: cartItems });
};

const success = async (req, res) => {
  res.status(200).json({ message: 'Success!' });
};

const cancel = async (req, res) => {
  res.status(200).json({ message: 'Cancel!' });
};

module.exports = { createCheckoutSession, success, cancel };
