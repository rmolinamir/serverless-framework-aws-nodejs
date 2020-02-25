import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello!');
});

const slsHandler: (event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult> = serverless(app);

export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  // You can do other things here:
  const result: APIGatewayProxyResult = await slsHandler(event, context);
  // And here:
  return result;
}
