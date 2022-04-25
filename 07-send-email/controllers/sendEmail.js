const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'dwaylybbvoqyjgo2@ethereal.email',
      pass: 'SyC5Pv5bN4w1VD2ag4',
    },
  });

  let info = await transporter.sendMail({
    from: '"my coding" <coding@gmail.com>',
    to: 'bar@example.com',
    subject: 'hello',
    html: '<h2>sending emails with node.js</h2>',
  });
  res.json({ info });
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'lavender0411@yahoo.com.tw', // Change to your recipient
    from: 'lavender041169@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const info = await sgMail.send(msg);
  res.json(info);
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent');
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

module.exports = sendEmail;
