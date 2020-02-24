var cheerio = require('cheerio');
module.exports = function parsePage(page) {
    try {
        var $ = cheerio.load(page);
        var rating = $('.i-stars__373c0__Y2F3O')
            .attr('aria-label')
            .trim()
            .split(' star rating')
            .join('');
        var reviewCount = $('.lemon--div__373c0__1mboc .arrange-unit__373c0__1piwO .nowrap__373c0__1_N1j p')
            .text()
            .trim()
            .split(' reviews')
            .join('');
        var yelpData = {
            rating: rating,
            reviewCount: reviewCount
        };
        return Promise.resolve(yelpData);
    }
    catch (error) {
        return Promise.reject("Error parsing the page: [" + JSON.stringify(page) + "]");
    }
};
