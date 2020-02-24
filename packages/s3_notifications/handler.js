'use strict';
const mailer = require('./mailer');

module.exports.s3_notification = async event => {
  try {
    // 1. Extract S3 information from the event object.description
    const uploadData = event.Records.map(record => ({
      bucketName: record.s3.bucket.name,
      file: record.s3.object.key,
      size: record.s3.object.size,
    }))[0];
    console.log('uploadData: ', uploadData);

    // 2. Generate an email using the data above.description
    const content = await mailer.generateContent(uploadData);
    console.log('content: ', content);

    // 3. Send the email.
    const response = await mailer.sendEmail(content);

    // 4. Send a response.
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          response,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    };
  }
};
