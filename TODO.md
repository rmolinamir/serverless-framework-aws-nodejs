1. Step Function sample:

```yml
stepFunctions:

stateMachines:

entityImporterMachine:

name: 
${{self:custom.projectName}}-EntityImporter-${{self:custom.stage}}

definition:

Comment: 
"Import an uploaded csv with catalogs"

StartAt: 
InputParser

States:

InputParser:

Type: 
Task

Resource: 
arn:aws:lambda:${{self:custom.region}}:#{AWS::AccountId}:function:${{self:custom.projectName}}-Importer-InputParser-${{self:custom.stage}}

Next: 
DataValidator

DataValidator:

Type: 
Task

Resource: 
arn:aws:lambda:${{self:custom.region}}:#{AWS::AccountId}:function:${{self:custom.projectName}}-Importer-DataValidator-${{self:custom.stage}}

Next: 
DataSplitter

DataSplitter:

Type: 
Task

Resource: 
arn:aws:lambda:${{self:custom.region}}:#{AWS::AccountId}:function:${{self:custom.projectName}}-Importer-DataSplitter-${{self:custom.stage}}

Next: 
DataBatchProcessor

DataBatchProcessor:

Type: 
Task

Resource: 
arn:aws:lambda:${{self:custom.region}}:#{AWS::AccountId}:function:${{self:custom.projectName}}-Importer-DataBatchProcessor-${{self:custom.stage}}

Next: 
DataBatchProcessorOutputForwarder

DataBatchProcessorOutputForwarder:

Type: 
Choice

Choices:

- Variable:
"$.nextState"

StringEquals:
"DataBatchProcessor"

Next: 
DataBatchProcessor

Default: 
Notifier

Notifier:

Type: 
Task

Resource: 
arn:aws:lambda:${{self:custom.region}}:#{AWS::AccountId}:function:${{self:custom.projectName}}-Importer-Notifier-${{self:custom.stage}}

End: 
true
```

2. Serverless parameter plugin sample:

```yml
- Effect: 
Allow

Action:

- dynamodb:BatchGetItem

- dynamodb:BatchWriteItem

- dynamodb:GetItem

- dynamodb:GetRecords

- dynamodb:PutItem

- dynamodb:Query

- dynamodb:Scan

- dynamodb:UpdateItem

- dynamodb:DeleteItem

Resource:

- arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${{self:custom.importTable.name}}
-
arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${{self:custom.importTable.name}}/*
```

3. Serverless variable syntax for plugin:

```yml
provider:

name: 
aws

runtime: 
nodejs12.x

stage: 
${{self:custom.stage}}

region: 
${{self:custom.region}}

profile: 
${{self:custom.profile}}

timeout: 
60

memorySize:
256

deploymentBucket:
${{self:custom.deploymentBucket.${{self:custom.stage}}}}

versionFunctions:
false

variableSyntax:
"\\${{([ ~:a-zA-Z0-9._\\'\",\\-\\/\\(\\)]+?)}}"
```

4. Lambda Proxy for Express app:

```ts
const 
serverless = require('serverless-http');

import { 
APIGatewayEvent, APIGatewayProxyResult,
Context } 
from 'aws-lambda';

import 
app from 
'./app';



const 
slsHandler: (event: 
APIGatewayEvent, context:
Context) 
=> Promise<APIGatewayProxyResult> =
serverless(app);



export 
async function 
handler(event: 
APIGatewayEvent, context:
Context): 
Promise<APIGatewayProxyResult> {

// // Make sure to add this so you can re-use `conn` between function calls.

// // See 
https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas

context.callbackWaitsForEmptyEventLoop =
false;

// you can do other things here



const 
result: APIGatewayProxyResult =
await 
slsHandler(event, 
context);

// and here

return 
result;

}



// import { APIGatewayEvent, Handler, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

// import * as awsServerlessExpress from 'aws-serverless-express';

// import app from './app';

// import { Server } from 'http';



// const server: Server = awsServerlessExpress.createServer(app);



// export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {



// // Make sure to add this so you can re-use `conn` between function calls.

// // See 
https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas

// context.callbackWaitsForEmptyEventLoop = false;



// const result: awsServerlessExpress.ProxyResult = awsServerlessExpress.proxy(server, event, context, 'PROMISE');



// const res: awsServerlessExpress.Response = await result.promise;

// return res;



// }
```
