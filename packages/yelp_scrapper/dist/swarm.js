require("request-promise");
var deployScraper = require('./utils/deployScraper');
var list = [
    'the-gyro-grill-plantation',
    'toro-latin-kitchen-and-tequileria-library-dania-beach',
    'holy-mackerel-beers-wilton-manors',
    'chef-dees-lighthouse-point',
    'chima-steakhouse-fort-lauderdale-3',
];
function swarm() {
    list.forEach(function (businessName) {
        deployScraper(businessName);
    });
}
swarm();
