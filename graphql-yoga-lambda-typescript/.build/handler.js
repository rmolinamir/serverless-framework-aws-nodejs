"use strict";
exports.__esModule = true;
var graphql_yoga_1 = require("graphql-yoga");
var typeDefs = "\n  type Query {\n    hello(name: String): String\n  }\n";
var resolvers = {
    Query: {
        hello: function (_, _a) {
            var name = _a.name;
            return "Hello " + (name || 'world');
        }
    }
};
var lambda = new graphql_yoga_1.GraphQLServerLambda({
    typeDefs: typeDefs,
    resolvers: resolvers
});
exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
