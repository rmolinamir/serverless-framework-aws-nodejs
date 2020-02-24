import { Projects } from './types';
import { hello as yelpScrapperHello } from 'yelp_scrapper';

export const hello: Projects.helloFunction = async event => {
  console.log('yelpScrapperHello(): ', yelpScrapperHello());
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello ${event.pathParameters.name}, the scrappers were launched.`,
      },
      null,
      2
    ),
  };
};

// export const cron_job: Projects.cronJobFunction = async () => {
//   const now = new Date();
//   const time = `${now.toLocaleDateString()}`;
//   try {
//     const scrapeRequest = await scrape('hardrock-cafe') as Projects.ILambdaReturn;
//     return {
//       statusCode: 200,
//       body: JSON.stringify(
//         {
//           message: `[${time}]: Successful scrape.`,
//           scrape: scrapeRequest.body,
//         },
//         null,
//         2
//       ),
//     };
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify(
//         {
//           message: `[${time}]: Hello, something went wrong: ${e.message}.`,
//         },
//         null,
//         2
//       ),
//     };
//   }
// };
