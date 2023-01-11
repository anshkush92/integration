const router = require('express').Router();

const {
  createCheckoutSession,
  success,
  cancel,
} = require('../controllers/stripe/stripe.controller');

router.post('/create-checkout-session', createCheckoutSession);
router.get('/success', success);
router.get('/cancel', cancel);

module.exports = router;
