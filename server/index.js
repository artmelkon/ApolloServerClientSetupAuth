const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require('dotenv').config({path: './env/.env'})

const {typeDefs} = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const dbConfig = {
  protocol: process.env.DB_PROTOCOL,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};

const {protocol, host, name, user, pass} = dbConfig;

const MONGODB =
  `${protocol}://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 5050;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen(PORT);
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
