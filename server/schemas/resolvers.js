const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/authentication");

const resolvers = {
 Query: {
  me: async (parent, args, context) => {
   if (context.user) {
    const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
    return userData;
   }
   return null;
  },
 },
 Mutation: {
  loginUser: async (parent, { email, password }) => {
   try {
    const user = await User.findOne({ email });

    if (!user) {
     throw AuthenticationError;
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
     throw AuthenticationError;
    }
    // console.log(user);
    const token = signToken(user);
    // console.log(token);
    return { token, user };
   } catch (err) {
    console.log(err);
    return err;
   }
  },
  signupUser: async (parent, { username, email, password }) => {
   try {
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
   } catch (err) {
    console.log(err);
   }
  },
  saveBook: async (parent, { bookData }, context) => {
   if (context.user) {
    const updatedUser = await User.findByIdAndUpdate(
     { _id: context.user._id },
     { $push: { savedBooks: bookData } },
     { new: true }
    );
    return updatedUser;
   }
   throw new Error("You need to be logged in!");
  },
  deleteBook: async (parent, { bookId }, context) => {
   if (context.user) {
    const updatedUser = await User.findByIdAndUpdate(
     { _id: context.user._id },
     { $pull: { savedBooks: { bookId } } },
     { new: true }
    );
    return updatedUser;
   }
   throw new Error("You need to be logged in!");
  },
 },
};

module.exports = resolvers;
