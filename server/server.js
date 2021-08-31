const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schema');

const PORT = process.env.PORT || 3001;
const app = express();
let server;

async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers
  });
  await server.start();
  //integrate Apollo server with Express application as middleware
  server.applyMiddleware({ app });
}
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
