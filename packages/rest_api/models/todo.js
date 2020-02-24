'use strict';

/**
 * Todo model.
 * @param {*} sequelize - Sequelize connection.
 * @param {*} DataTypes - Sequelize instance.
 */
module.exports = function Todo(sequelize, DataTypes) {
    const now = new Date();
    return sequelize.define(
    // Table Name
    'todo',
    // Table Columns
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: now,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: now,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    // General Table Characteristics
    {
      paranoid: true,
      underscored: true,
    },
  );
}
