const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

app.use(bodyParser.json());

const port = process.env.PORT;
const domain = process.env.MAILGUN_DOMAIN;
const apiKey = process.env.MAILGUN_API_KEY;

console.log(apiKey);

const mg = mailgun({ apiKey, domain });

app.post('/send-email', (req, res) => {
  const { email, name, text } = req.body || {};

  const msg = {
    to: ['miu.arges@gmail.com'],
    from: 'miu.razvan28@gmail.com',
    subject: `Coaching website - ${name}(${email})`,
    text,
  };

  mg.messages().send(msg, (error, body) => {
    if (error) {
      console.error(error);
      res.json({ success: false, error: 'Failed to send email' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
