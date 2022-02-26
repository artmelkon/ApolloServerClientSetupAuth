const { ApolloError } = require("apollo-server-errors");
const bcrypt = require('bcrypt');

const User = require("../../models/User");

module.exports = {
  Mutation: {
    registerUser: async (
      _,
      { registerInput: { username, email, password } }
    ) => {
      // query if user email exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new ApolloError(
          `A user is already exists with the email ${email}`,
          "USER_ALREADY_EXISTS"
        );
      }

      // for hasing password check User model
      // saving user to db
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: password,
      });

      // creating webtoken
      const token = newUser.generateAuthToken();
      newUser.token = token;

      // save to
      await newUser.save();
      return newUser;
    },
    loginUser: async (_, { loginInput: { email, password } }) => {
      // query if user email exists
      const user = await User.findOne({ email });
      // validate user credentials
      if (!user) {
        throw new ApolloError(
          `Incorrect email or password!`,
          "USER_INCORRECT_CREDENTIALS"
        );
      }

      var isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new ApolloError(
          `Incorrect email or password!`,
          "USER_INCORRECT_CREDENTIALS"
        );
      }

      // creating webtoken
      user.token = await user.generateAuthToken();
      return user;
    },
  },
  Query: {
    user: async (_, { ID }) => await User.findById(ID),
  },
};
