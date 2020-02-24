const nodemailer = require('nodemailer');
const config = require('./config');

module.exports = function sendEmail(content) {
  return new Promise((resolve, reject) => {
    // Configure transporter.
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
    // Create recipient string.
    const recipients = config.to.join(', ');
    // Define email options.
    const mailOptions = {
      from: 'mail@beast.com',
      to: recipients,
      subject: content.subject,
      text: content.textBody,
      html: content.htmlBody,
    }
    // Send the email.
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        const errorMessage = JSON.stringify(error);
        console.log('Error sending email: ', errorMessage);
        reject(new Error(errorMessage));
      } else {
        const successMessage = `Message ${info.messageId} send: ${info.response}`;
        console.log(successMessage);
        resolve(successMessage);
      }
    });
  });
}
