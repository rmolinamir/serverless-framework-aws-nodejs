'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello ${event.pathParameters.name}`,
      },
      null,
      2
    ),
  };
};

module.exports.cron_job = async event => {
  const now = new Date();
  const message = `The time is: ${now.toLocaleDateString()}`;
  console.log('message: ', message);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message,
      },
      null,
      2
    ),
  };
};
