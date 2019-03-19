const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();
const SERVER_PORT = 4000;

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true // Disable for prod.
}));

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}...`);
});


