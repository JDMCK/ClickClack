/**
 * This file generates the Swagger documentation for the ClickClack API using swagger-autogen.
 *
 * To ensure the API documentation uses actual paths like "/api/v1/..." instead of template strings 
 * like "${API_PREFIX}", you MUST follow the steps below before generating Swagger docs:
 *
 * 1. In `index.js`, temporarily replace all instances of `${API_PREFIX}` with the actual string `'/api/v1'`.
 *    - This ensures Swagger will pick up the correct full path in the documentation.
 *
 * 2. Run the Swagger generation script:
 *      $ npm run swagger
 *
 * 3. Once `swagger-output.json` is updated, revert the changes in `index.js` to restore `${API_PREFIX}`.
 *    - This keeps your code DRY and consistent for development.
 *
 * 4. Start your dev server like normal:
 *      $ npm run dev
 */

import swaggerAutogenFactory from 'swagger-autogen';

const swaggerAutogen = swaggerAutogenFactory();

const doc = {
  info: {
    title: 'ClickClack API',
    description: 'API documentation for the ClickClack typing test app.',
  },
  host: 'localhost:3001', 
  schemes: ['http'],    
};

const outputFile = './swagger-output.json';
const routes = ['./index.js']; 

swaggerAutogen(outputFile, routes, doc);