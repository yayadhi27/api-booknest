const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookNest API',
      version: '1.0.0',
      description: 'Book Management API using Node.js and Express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // 🟢 Correct path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
