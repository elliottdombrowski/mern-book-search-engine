const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('');
          }
        },
    },
    Mutation: { 
        //PARENT FOR HEAVILY NESTED, ARGS = req.body, CONTEXT = req.session
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });

          if (!user) {
            throw new AuthenticationError('no user found');
          }

          const correctPw = await user.isCorrectPassword(password);

          if (!correctPw) {
            throw new AuthenticationError('incorrect password');
          }

          const token = signToken(user);
          return { token, user };
        },

        addUser: async (parent, args, context) => {
          try {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
            
          } catch (error) {
            console.log(error);
          }
        },

        saveBook: async (parent, args, context) => {
          const user = await User.findOne({ _id: context.user._id }).populate('savedBooks');
          const token = signToken(user);

          return { token, user };
        },

        removeBook: async (parent, args, context) => {
          const book = await Book.findOneAndDelete({})
          const token = signToken(user);

          return { token, user };
        },
    },
};

module.exports = resolvers;