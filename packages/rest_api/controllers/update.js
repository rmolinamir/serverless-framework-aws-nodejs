'use strict';
const db = require('../db');

module.exports.updateTodo = async function updateTodo(event) {
  try {
    const body = JSON.parse(event.body);
    const [,data] = await db.todo.update(
      // Updated Todo properties.
      {
        task: body.task,
        updated_at: new Date(),
      },
      // Query.
      {
        where: { id: event.pathParameters.id },
        returning: true,
      },
    );
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          todo: data[0],
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
