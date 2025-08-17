// Backend for device connection email verification
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

// In-memory store for codes (for demo; use DB in production)
const codes = {};

app.post('/api/send-verify-email', async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  codes[email] = code;
  // Configure your transporter with your SMTP/email provider
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your provider
    auth: {
      user: 'hertz@hertzynet.com',
      pass: 'HertzHertzy25'
    }
  });
  await transporter.sendMail({
    from: 'no-reply@yourapp.com',
    to: email,
    subject: 'Device Connection Verification',
    text: `Your verification code is: ${code}`
  });
  res.sendStatus(200);
});

app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (codes[email] && codes[email] == code) {
    delete codes[email];
    return res.json({ verified: true });
  }
  res.json({ verified: false });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
