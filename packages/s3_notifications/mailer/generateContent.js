const momentTimezone = require('moment-timezone');

module.exports = function generateContent(data) {
  return new Promise((resolve, reject) => {
    try {
      // Timestamp of upload.
      const timestamp = `${momentTimezone.tz('America/New_York').format('MMMM Do, h:mm:ss a')} PT`;
      // Subject line.
      const subject = `New upload to S3 Bucket: ${data.bucketName}`
      // Text body.
      const textBody = `
        Great news!
        Someone has uploaded ${data.file} (${data.fileSize} bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.
        Congrats!
        Sincerely,
        One of Beast's First Serverless Functions
      `;

      // HTML body.
      const htmlBody = `
        <div style="max-width: 600px; margin: 20px auto">
          <h1>Great news!</h1>
          <p style="line-height: 22px; font-size: 16px;">Someone uploaded <b>${data.file}</b> (${data.fileSize} bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.</p>
          <p style="line-height: 22px; font-size: 16px;">Congrats!</p>
          <p style="line-height: 22px; font-size: 16px;">Sincerely,</p>
          <p style="line-height: 22px; font-size: 16px;"><i>One of Beast's First Serverless Functions</i></p>
        </div>
      `;
      console.log('Generated content.');
      resolve({
        subject,
        textBody,
        htmlBody,
      });
    } catch (error) {
      console.log('generateContent error: ', error);
      reject(new Error(JSON.stringify(error)));
    }
  })
}
