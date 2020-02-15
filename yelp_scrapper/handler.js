'use strict';
const { getPage, parsePage, saveRatingsToDb, deployScraper } = require('./utils');

module.exports.scrape = async businessName => {
  // 1. Fetch Yelp Page.
  const page = await getPage(businessName);

  // 2. Parse the page.
  const yelpData = await parsePage(page);

  // 3. Save Ratings data to our DB.
  try {
    await saveRatingsToDb(yelpData, businessName);
    return {
      statusCode: 200,
      body: JSON.stringify(
        { message: `Scrapped ${businessName}` },
        null,
        2
      ),
    };
  } catch (error) {
    return new Error(`Error scrapping: ${JSON.stringify(error)}`);
  }
};

module.exports.launch_scrappers = async () => {
  // 1. List of business names.
  const fakeDatabaseResults = [
    'the-gyro-grill-plantation',
    'toro-latin-kitchen-and-tequileria-library-dania-beach',
    'holy-mackerel-beers-wilton-manors',
    'chef-dees-lighthouse-point',
    'chima-steakhouse-fort-lauderdale-3',
  ];

  // 2. Launch a Lambda for each business name.
  fakeDatabaseResults.forEach(fakeBusinessName => {
    deployScraper(fakeBusinessName);
  });
};
