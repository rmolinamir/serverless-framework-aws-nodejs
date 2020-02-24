# S3 Notifications

Takeaways:

- Trigger a Lambda whenever an event occurs in an S3 bucket.
- Creating an S3 bucket via `serverless.yml`.
- Send emails from a Node backend.

Technologies:

- AWS S3 for storage.
- Nodemailer to send emails.

## S3 Bucket

It's possible for Lambdas to function as notifications after mutating a AWS S3 bucket, e.g. uploading or deleting files. To do this, the `serverless.yml` file must be configured to create a (or to connect to an existing) AWS S3 bucket, to allow the serverless application to do actions on the bucket, the resources, and the Lambda event triggers (e.g. file uploads).

```yml
service: s3-notifications

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: us-east-1
  profile: serverless-admin
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "*"

...

functions:
  s3_notification:
    handler: handler.s3_notification
    events:
      - s3:
          bucket: s3-notifications-serverless-admin # Bucket has to be GLOBALLY unique.
          event: s3:ObjectCreated:* # Whenever an object is uploaded, it's going to trigger this event.
          rules:
            - prefix: documents/ # Only trigger when files are uploaded to the documents folder.
            - suffix: .pdf # Only trigger when PDF files are uploaded.
```

Serverless official documentation on AWS S3 configurations can be found [here](https://serverless.com/framework/docs/providers/aws/events/s3/).
