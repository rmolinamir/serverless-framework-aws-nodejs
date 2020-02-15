const uuid = require('uuid');
const AWS = require('aws-sdk');

// Connecting to the database.
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async function saveRatingsToDb(yelpData, businessName) {
  const date = new Date();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      businessName,
      reviewCount: yelpData.reviewCount,
      rating: yelpData.rating,
      scrapedAt: date.toISOString(),
    },
  };
  dynamoDb.put(params, error => {
    if (error) {
      return Promise.reject(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);
    }
    return Promise.resolve(params.Item);
  });
};
