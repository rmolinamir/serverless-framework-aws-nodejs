'use strict';
const db = require('../db');

module.exports.deleteTodo = async function deleteTodo(event) {
  try {
    const destroyed = await db.todo.destroy({
      where: {
        id: event.pathParameters.id,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          destroyed,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    };
  }
}
