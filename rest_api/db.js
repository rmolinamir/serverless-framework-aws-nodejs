'use strict';

const Sequelize = require('sequelize');
const sequelizeConnection = new Sequelize('postgres://postgres:password@test.ck8kpvadaaan.us-east-1.rds.amazonaws.com:5432/test');

const todo = require('./models/todo')(sequelizeConnection, Sequelize);

const db = {
  Sequelize,
  sequelizeConnection,
  todo,
};

// Sync our models to our database to create the tables based on our models.
db.sequelizeConnection.sync({ logging: console.log });

module.exports = db;
