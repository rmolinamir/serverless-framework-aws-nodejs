const AWS = require('aws-sdk');

module.exports = function deployScraper(businessName) {
  const lambda = new AWS.Lambda({
    region: 'us-east-1',
  });

  return lambda.invoke(
    {
      FunctionName: 'yelp-scrapper-dev-scrape',
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify(businessName),
    },
    (error, data) => {
      if (error) {
        return new Error(`Error scraping: ${JSON.stringify(error)}`)
      } else if (data) {
        console.log('data: ', data);
        return JSON.stringify(data);
      }
    },
  );
}
