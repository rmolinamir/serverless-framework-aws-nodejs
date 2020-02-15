# Serverless Framework

[Source 1](https://serverless.com/)
[Source 2](lorenstewart.m)

Serverless Architecture is a cloud based backend strategy that works with cloud platforms. There are many out there like OpenWhisk, Google's Cloud Platform, Microsoft Azure, and Amazon Web Services. This project will focus on AWS specifically their serverless architecture Lambda.

AWS Lamda works with a variety of runtime languages such as Java, Python, C#, JavaScript, and many others. Then again, this project will focus on creating serverless aplications on Node.js.

The **serverless framework** is a recent development in the serverless ecosystem. The generic name generates a lot of confusion but it's a gift to programmers. The serverless framework abstracts away from the various cloud platform providers and offers an easy way to write serverless code regardless of your chosen platform.

The serverless framework, plus Amazon's Lambdas, plus Node.js, are a powerful combination for creating scalable and affordable backend.

## What is Serverless

Serverless architecture isn't actually serverless, there is no cloud - it just uses someone else's computer. In our case, we'll be using AWS, specifically serverless functions that only execute when you need them. This means that we only pay when these functions run, we only pay for their uptime.

Serverless architecture means:

- You're using a cloud provider's server.
- More secure.
- Easy to scale.
- No maintenance.

## What is a Lambda

- Function stored by AWS.
- Only run on as-needed basis.
- Infinitely scalable, it's limited to 1000 executions at a time by default but limit can be raised.
- Only pay for execution time.
- Best described as *Function as a Service* (FaaS).

## Events that can trigger a Lambda

- HTTP events.
- Scheduled (cron) jobs.
- Watchers that monitor other parts of the AWS ecosystem.
  - For example: AWS S3 Buckets. Thse are static file storages and you can monitor particular S3 buckets and whenever a file is uploaded you can run a function, or whenever something is deleted, modified.

## Benefits of Lamdas

- Very inexpensive.
- Auto-scaling.

**How cheap is cheap?**

- Charged in 100ms increments.
- One million requests for free monthly.
- $0.20 to buy an additional one million requests.
- 400,000 GB-seconds of free compute time.
- After that, it's $0.00001667 per GB-second user.

**Disclaimer**: [Prices vary for regions, and these prices are the AWS fees as of February 2020](https://aws.amazon.com/lambda/pricing/).

**What is auto-scaling?**

- When traffic increases, AWS scales up for you.
- When traffic decreases, AWS uses fewer Lambdas.

## Serverless makes Lambdas better

AWS Lambdas can be a headache to code because of all the configuration that AWS requires. The serverless framework replaces all that complex configuration with their very own straightforward configuration file. This results in:

- Little need to use the AWS console.
- Great templates in many languages. The serverless framework provides templates in many different languages that can be used as a boilerplate for your applications with a single terminal command.
- Blends with a typical dev workflow. This means that you can use your terminal and your editor rather than having to log into the AWS console and do your coding there or inserting your code through the console.
- All the complex AWS configuration is replaced with a single YAML file.

## How to set up the serverless framework

The first set is to create a user that has the credentials to create new Lambdas, connect databases, etc. Assuming an account is logged in and at the AWS console dashboard, go to the Identity and Access Management (IAM) service. Next, add a user.

The serverless framework recommends to add a user with a user name of "`serverless-admin`", then check the checkbox that says **Programmatic access** next to the *access type* header.

Next, groups with special permissions have to be created so that the users can be attached to these groups. Create a group with any access, for this example it'll be `adminAccess`, then we want to give it `AdministratorAccess` by checking its corresponding box inside the policies table. Create the group, then attach the user to it.

Next are the tags for the user. This step is optional and simply consists of adding metadata to the user, such as email address, job title, etc. Customized key-value pairs. Skip.

The next step is a review of the previous steps to see if everything is correctly set up. And then finally, submit the user to create it.

**After creating the user, make sure to store the access key ID and the secret access key somewhere safe**.

## Using Serverless from your machine

It's very simply. If using `npm`, simply install `serverless` globally by entering in the CLI: `npm install -g serverless`. After installing serverless, we need to setup our AWS credentials. In this case, the credentials for the previous user. To do this, type the following in the CLI:

```linux
sls config credentials --provider aws --key <Access key ID> --secret <Secret access key> --profile serverless-admin
```

- `sls` is the shorthand for `serverless`, any of the previous pair are viable.
- `config` and `credentials` to execute set up the user.
  - `--provider` sets up the serverless provider.
  - `--aws` is the key for Amazon Web Services.
  - `--key` is the Access key ID from the previous step.
  - `--secret` is the Secret access key from the previous step.
  - `--profile` is the User name from the previous step (`serverless-admin`).

## Creating a project

Now that `serverless` is installed and the admin account is ready and authenticated in the machine, it's time to create a project with a template, in this case a Node.js template. To do this, type the following in the CLI:

```linux
sls create -t aws-nodejs
```

- `sls` is the shorthand for `serverless`, any of the previous pair are viable.
- `create` to create a new project.
  - `-t aws-nodejs` creates a project with a AWS Node.js template.

This will create a project with the following files:

- `.gitignore`.
- `handler.js` with a `hello` function.
- The `serverless.yml` YAML file with the server configuration.

**NOTE:** Make sure to add your profile to the `serverless.yml` provider. Example below.

## Adding Lambda Functions

The `serverless.yml` file allows us to set up Lambda functions and their respective configurations such as HTTP paths, methods, parameters, websockets, etc.

Below is an example setting up a `hello` function using the `serverless-offline` package to run serverless in an offline local environment:

```yml
# serverless.yml
service: projects

plugins:
  - serverless-offline

provider:
  name: aws
  runtime: nodejs12.x
  profile: serverless-admin
  stage: dev
  region: us-east-1

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: message/{name}
          method: get
```

```js
// handler.js
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
```

## Offline Serverless Environment

To test the previous Lambda function, install the `serverless-offline` package in the local directory and add it to the `serverless.yml` plugins as shown above.

Then start the server in the CLI by running: `sls offline start`.

## Serverless Deploying

Deploying through serverless is very easy. Simply run `sls deploy` in the CLI. Make sure you have your credentials set up correctly in the provider found inside `serverless.yml`. After running this command, the CLI will output the following:

```cli
$ sls deploy
Service Information
service: projects
stage: dev
region: us-east-1
stack: projects-dev
resources: 12
api keys:
  None
endpoints:
  GET - https://<redacted>.execute-api.us-east-1.amazonaws.com/dev/message/{name}
functions:
  hello: projects-dev-hello
layers:
  None
```

Notice that the output contains several metadata including the name of our Lambda functions as well as their endpoints. In this case, the `hello` function was named `projects-dev-hello` after the name of the `service`, the `stage`, and the name of the `function`.

The endpoints of any deployed Lambda function can be tested using APIs such as Postman or GraphQL playgrounds if using a GraphQL architecture.

Now head over to your AWS Management Console to verify the Lambda function is there. To do this, go to the Lambda service, then go the *Functions* tab. **Make sure you're in the correct region that matches your region set in the `serverless.yml` file, otherwise you won't be able to see your functions properly**.

## Deploying to a Production Environment

In the previous deployment, the `serverless.yml` stage was set as `dev`. To deploy to production without having to modify the `serverless.yml`, we can simply deploy to a different stage by using the `-s` flag. To do this, simply run `sls deploy -s production` in the CLI, where `-s` is the stage.

After executing the former command in the CLI, the following output is displayed:

```cli
$ sls deploy -s production
Service Information
service: projects
stage: production
region: us-east-1
stack: projects-production
resources: 12
api keys:
  None
endpoints:
  GET - https://ao45c1tej8.execute-api.us-east-1.amazonaws.com/production/message/{name}
functions:
  hello: projects-production-hello
layers:
  None
```

Notice how now, the name and endpoint of the `hello` function changes. This will also be reflected in the AWS Lamda console.

Now, let's say that in this case we **only** want to deploy the `hello` Lambda function after doing changes to it, so in this case we would run: `sls deploy function -s production -f hello`, where:

- `deploy function` instructs serverless to only deploy one function.
- `-s` is the stage.
- `-f` is the name of the function.

After executing the former command in the CLI, the following output is displayed:

```cli
$ sls deploy function -s production -f hello
Serverless: Packaging function: hello...
Serverless: Excluding development dependencies...
Serverless: Code not changed. Skipping function deployment.
Serverless: Successfully updated function: hello
```

**NOTE:** It is also possible to deploy to a specific region by using the `-r` flag.

## Accessing Lambda Logs

It's possible to access the logs of Lambda functions using `serverless`. For example, we can check the `hello` Lambda logs that is deployed to the `production` stage by running the following command:

```cli
sls logs -f hello -s production --startTime 10m
```

Where:

- `logs` instructs serverless to output the logs.
- `-s` is the stage.
- `-f` is the name of the function.
- `-startTime` is the timeframe between the present and the specified time (`10m` - 10 minutes) in which we want the logs to be included in the output.

This outputs the following logs:

```cli
$ sls logs -f hello -s production --startTime 10m
START RequestId: <redacted-request-id> Version: $LATEST
END RequestId: <redacted-request-id>
REPORT RequestId: <redacted-request-id>  Duration: 2.64 ms       Billed Duration: 100 ms Memory Size: 1024 MB    Max Memory Used: 70 MB  Init Duration: 127.30 ms
```

If we run `sls logs -f hello -s dev --startTime 10m` to check our development stage, the following output is read:

```cli
$ sls logs -f hello -s dev --startTime 10m
START RequestId: 25678f9c-950f-46c2-8105-d5aa41e9c8f9 Version: $LATEST
END RequestId: 25678f9c-950f-46c2-8105-d5aa41e9c8f9
REPORT RequestId: 25678f9c-950f-46c2-8105-d5aa41e9c8f9  Duration: 2.56 ms       Billed Duration: 100 ms Memory Size: 1024 MB    Max Memory Used: 70 MB  Init Duration: 130.51 ms

START RequestId: 869bbe56-68e2-4fef-ac5b-2e9b52c44bc8 Version: $LATEST
END RequestId: 869bbe56-68e2-4fef-ac5b-2e9b52c44bc8
REPORT RequestId: 869bbe56-68e2-4fef-ac5b-2e9b52c44bc8  Duration: 4.38 ms       Billed Duration: 100 ms Memory Size: 1024 MB    Max Memory Used: 71 MB
```

The init duration is the time it takes AWS to fire up our functions. To avoid this delay, you can check out [Cold Starts](https://mikhail.io/serverless/coldstarts/aws/).

## Removing Lambda Functions

If you want to remove a Lambda Function, then you can run `sls remove -s <stage>` to remove everything associated with the passed stage, e.g. `dev` stage. If we execute the above command in the CLI we receive the following output:

```cli
$ sls remove -s dev
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
.......................
Serverless: Stack removal finished...
```

If everything went well, you can go back to the AWS console to confirm that every function related to the `dev` stage (in this case it would only be `hello`) are now gone.

## Cron Jobs

Cron Jobs are Lambda functions that are executed on a schedule, for example every day at midnight, or a function that generates a report on the first of the month at 6m then emails. There's a lot of great uses for these type of functions and Lambdas are set up to make them very easy to set up.

Let's say we want to create a `cron_job` function that returns the current date every minute:

```js
// handler.js
'use strict';

...

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

```

To set up a Cron Job, first we have to set the function up in the `serverless.yml` file just like we would set up a regular Lambda function with a `schedule` event instead of a `http` event.

```yml
# serverless.yml
functions:
  # Our old hello function
  hello:
    handler: handler.hello
    events:
      - http:
          path: message/{name}
          method: get
  # Our new cron_job function
  cron_job:
    handler: handler.cron_job
    events:
      # It will be executed every minute
      - schedule: rate(1 minute)
```

The `schedule` syntax while being very semantic, it's very specific to AWS. [The documentation can be found here](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html). Cron Jobs logs can also be accessed just like regular Lambda functions with the `sls logs` command.

## Cron Jobs and Serverless Offline

It's possible to locally execute and test scheduled Lambda functions or Cron Jobs by installing another plugin similar to `serverless-offline`. The plugin used for scheduled functions is called `serverless-offline-scheduler`. To install it, simply run `npm i -D serverless-offline-scheduler`, then add it to the `serverless.yml`:

```yml
# serverless.yml
plugins:
  - serverless-offline
  - serverless-offline-scheduler
```

Afterwards, start the server with the `--printOutput` flag to be able to read the output of our Lambda functions, then wait for the Cron Job to run. You'll see logs such as these ones:

```cli
$ sls offline start --printOutput
Serverless: scheduler: scheduling cron_job/cron_job with */1 * * * *
Serverless: cron_job
Serverless: Starting Offline: dev/us-east-1.

Serverless: Routes for hello:
Serverless: GET /message/{name}
Serverless: POST /{apiVersion}/functions/projects-dev-hello/invocations

Serverless: Routes for cron_job:
Serverless: POST /{apiVersion}/functions/projects-dev-cron_job/invocations

Serverless: Offline [HTTP] listening on http://localhost:3000
Serverless: Enter "rp" to replay the last request
message:  The time is: 2/14/2020
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"The time is: 2/14/2020\"\n}"
}
message:  The time is: 2/14/2020
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"The time is: 2/14/2020\"\n}"
}
message:  The time is: 2/14/2020
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"The time is: 2/14/2020\"\n}"
}
message:  The time is: 2/14/2020
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"The time is: 2/14/2020\"\n}"
}
```

More information about `serverless` commands [here](https://lorenstewart.me/2017/09/19/serverless-framework-terminal-commands/).
