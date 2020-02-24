declare namespace YelpScrapper {
    interface ILambdaReturn {
        statusCode: 200;
        body: string;
    }
    type scrapeFunction = (businessName: string) => Promise<Error | ILambdaReturn>;
    type launchScrappersFunction = () => Promise<void>;
}
export declare const hello: () => string;
export declare const scrape: YelpScrapper.scrapeFunction;
export declare const launch_scrappers: YelpScrapper.launchScrappersFunction;
export {};
