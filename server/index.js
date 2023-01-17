// Server entry point

/**
 * @description - Loading all relevant dependencies
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: `.env.local`, override: true });

const app = express();

/**
 * @description - Loading all relevant middlewares
 * @middlewares - cors, morgan, express.json, express.urlencoded
 */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @description - Loading all relevant routes
 * @routes - /, auth/login, auth/register
 */
app.use(require('./routes/home.route'));
app.use(require('./routes/stripe.route'));
app.use(require('./routes/sendgrid.route'));
app.use(require('./routes/twilio.route'));
app.use('/auth', require('./routes/auth.route'));

/**
 * @description - Loading all relevant environment variables
 */
const PORT = process.env.PORT || 8000;

/**
 * @description - Running the server at PORT || 8000
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
