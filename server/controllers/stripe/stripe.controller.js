const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;
const TEMP_MAIL = 'haseb98364@tohup.com';

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
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'IN', 'GB', 'AU', 'NZ', 'IE', 'SG'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1500, currency: 'usd' },
          display_name: 'Next Day Air',
          // Delivers in exactly 1 day
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 1 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: lineItems,
    customer_email: TEMP_MAIL,
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
