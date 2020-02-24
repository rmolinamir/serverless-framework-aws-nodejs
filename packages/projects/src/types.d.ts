import { APIGatewayEvent } from 'aws-lambda';

declare namespace Projects {
  interface ILambdaReturn {
    statusCode: 200 | 500
    body: string
  }
  type helloFunction = (event: APIGatewayEvent) => Promise<Error | ILambdaReturn>
  type cronJobFunction = () => Promise<Error | ILambdaReturn>
}
