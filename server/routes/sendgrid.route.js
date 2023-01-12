const router = require('express').Router();

router.post('/sendgrid', (req, res) => {
  res.json({ message: 'Hello from SendGrid', data: req.body });
});

module.exports = router;
