const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Ruby" <ruby@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
