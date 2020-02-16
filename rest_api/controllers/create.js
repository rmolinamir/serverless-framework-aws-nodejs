'use strict';
const db = require('../db');

module.exports.createTodo = async function createTodo(event) {
  try {
    const body = JSON.parse(event.body);
    const todo = await db.todo.create({
      task: body.task,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          todo,
        },
        null,
        2
      ),
    };
  } catch(error) {
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
