const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
  to: 'xibagi4452@unicsite.com',
  from: 'anshkush92@gmail.com',
  subject: 'Learning - Send Emails with SendGrid',
  text: 'Learning how to send the emails with the help of the sendgrid, only downfall is 100 emails /day',
  html: `<p>Learning how to send the emails with the help of the sendgrid, only downfall is 100 emails /day</p>`,
};

const sendEmail = async (req, res) => {
  const toEmail = req.body?.email;

  try {
    const response = await client.send({ ...message, to: toEmail });

    console.log(
      '🚀 ~ file: sendgrid.controller.js:16 ~ sendEmail ~ response',
      response,
      toEmail
    );

    res
      .status(200)
      .json({ message: 'Email sent successfully', data: req.body });
  } catch (error) {
    res.status(400).json({ message: 'Error sending email', error });
  }
};

module.exports = {
  sendEmail,
};
