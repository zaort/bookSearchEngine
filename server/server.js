const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const { ApolloServer } = require("@apollo/server");
const path = require("path");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const { authenticationMiddleware } = require("./utils/authentication.js");

const { typeDefs, resolvers } = require("./schemas/index.js");
const db = require("./config/connection.js");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  app.use(cors());
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authenticationMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startServer();






// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
