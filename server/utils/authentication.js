require("dotenv").config();
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const path = require("path");
const secret = "secret";

const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Server was unable to authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authenticationMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    const authHeader = req.headers.authorization;

    if (authHeader) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      // console.log(`missing token for ${req.method} ${req.path}`);
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      // console.log(data);
    } catch (err) {
      console.log("Invalid token", err);
      return req;
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};




// const jwt = require('jsonwebtoken');

// // set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   // function for our authenticated routes
//   authMiddleware: function (req, res, next) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.headers.authorization;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return res.status(400).json({ message: 'You have no token!' });
//     }

//     // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//       return res.status(400).json({ message: 'invalid token!' });
//     }

//     // send to next endpoint
//     next();
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
