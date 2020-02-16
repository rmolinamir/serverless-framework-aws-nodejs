'use strict';
const db = require('../db');

module.exports.getTodo = async function getTodo(event) {
  try {
    const todo = await db.todo.find({
      where: {
        id: event.pathParameters.id,
      },
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

module.exports.listTodos = async function listTodos() {
  try {
    const todos = await db.todo.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          todos,
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
