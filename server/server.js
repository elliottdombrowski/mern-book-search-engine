const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } =  require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    //CONSOLE LOG API SERVER PORT
    console.log(`server running at port ${PORT}`);
    //CONSOLE LOG GRAPHQL SERVER
    console.log(`GraphQL Playground running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});