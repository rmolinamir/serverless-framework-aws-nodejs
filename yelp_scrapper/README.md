# Yelp Scrapper

Takeaways:

- Connects to a DynamoDB from a Lambda.
- Setting up a cron Lambda.
- Executing one Lambda function from within another Lambda function, and setting up those permissions to make that possible.
- Web scraping using Node.js

Technologies:

- Request-Promise for HTTP calls.
- Cheerio library for DOM parsing.
- DynamoDB for persistence.

**NOTE:** Yelp has a public API capable of doing this, this is project was only made for education porpuses. The reason Yelp is used for this project is because Yelp serves the entire HTML page in the first paint. This results in not requiring the use of a headless browser (e.g. Chromeless) to scrape the website due to JavaScript not serving the entire HTML page on the first paint, e.g. React websites not using SSR.

## Dynamo DB

Amazon's NoSQL database similar to MongoDB, often called Document Databases. To add DynamoDB to the Lambda functions, it must be connected through the `serverless.yml` file by adding the `environment` property to the `provider` to connect the database by setting up an environment (which we will have access to from the Lambda functions), and the `iamRoleStatements` property to the `provider` to add permissions and enable the actions (e.g. `Query`, `Scan`, `GetItem`, `UpdateItem`, etc.). For example:

```yaml
# serverless.yml
provider:
  name: aws
  runtime: nodejs12.x
  profile: serverless-admin
  stage: dev
  region: us-east-1
  environment:
    DYNAMODB_TABLE: yelp-ratings
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self.provider.environment.DYNAMODB_TABLE}"
```

- `DYNAMODB_TABLE` is the name of the database.
- `Action` dictates which actions perform with the database due to the `Effect: Allow` property.
- `Resource` is the AWS DynamoDB's Amazon Resource Name (ARN).

## Cron Job that invokes other Lambda Functions

Let's say we want to schedule news scrapers. To do this, we would have to create a cron job capable of calling or scrapper Lambda function and configure its schedule. It's very simple, but it requires some configuration in the `serverless.yml` file:

```yml
# serverless.yml
provider:
  ...
  iamRoleStatements:
    - Effect: Allow
      Action:
        - "lambda:InvokeFunction"
      Resource: "*"
    ...

functions:
  ...
  launch_scrappers:
    handler: handler.launch_scrappers
    events:
      - schedule: rate(1 minute)
```

Notice how the cron job also requires special permissions to call other Lambda functions. To do this simply set a new `Effect: Allow` which to allows Lambda to invoke functions.
