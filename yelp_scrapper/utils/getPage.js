const request = require('request-promise');

module.exports = function getPage(businessName) {
  // Example business page: https://www.yelp.com/biz/savor-cinema-fort-lauderdale
  const url = `https://www.yelp.com/biz/${businessName}`;
  return request({ method: 'GET', url })
};
