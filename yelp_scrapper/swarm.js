require("request-promise");
const deployScraper = require('./utils/deployScraper');

const list = [
  'the-gyro-grill-plantation',
  'toro-latin-kitchen-and-tequileria-library-dania-beach',
  'holy-mackerel-beers-wilton-manors',
  'chef-dees-lighthouse-point',
  'chima-steakhouse-fort-lauderdale-3',
];

function swarm() {
  list.forEach(businessName => {
    deployScraper(businessName);
  });
}

swarm(list);
