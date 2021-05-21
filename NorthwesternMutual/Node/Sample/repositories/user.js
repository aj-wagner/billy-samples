// const { use } = require("passport");
const { User } = require("../models/models");

/*
Create a user in the user collections using the given userInformation
Returns the user if successfully created. Otherwise, return null
*/
const createUser = async ({
  email,
  password,
  pid,
  username,
  dob,
  phoneNumber,
}) => {
  try {
    // Create the user and save the user into the DB
    const user = new User({
      local: { email },
      pid,
      username,
      date_of_birth: dob,
      phone_number: phoneNumber,
    });

    const hash = await user.generateHash(password);

    user.local.password = hash;
    await user.save();

    // User successfully created. Return user
    return user;
  } catch (err) {
    return null;
  }
};

/*
Get User with email ${email} from the user collection
Return user if user with email found. Otherwise, return null
*/
const getUserWithEmail = async (email) => {
  try {
    // Find User using email
    const user = await User.findOne({ "local.email": email }).exec();

    // If user not found, return null
    if (!user) {
      return null;
    }

    // User found and all check successful, return user
    return user;
  } catch (err) {
    return null;
  }
};

/*
Get User with username username from the user collection
Return user if user with username found. Otherwise, return null
*/
const getUserWithUsername = async (username) => {
  try {
    // Find User using username
    const user = await User.findOne({ username }).exec();

    // If user not found, return null
    if (!user) {
      return null;
    }

    // User found and all check successful, return user
    return user;
  } catch (err) {
    return null;
  }
};

/*
Get User with id id from the user collection
Return user if user with id found. Otherwise, return null
*/
const getUserWithId = async (id) => {
  try {
    // Find user using id
    const user = await User.findById(id);

    // If User not found, return null
    if (!user) {
      return null;
    }

    // User found and all check successful, return user
    return user;
  } catch (err) {
    return null;
  }
};

/*
Get User with phone number phoneNumber from the user collection
Return user if user with phoneNumber found. Otherwise, return null
*/
const getUserWithPhoneNumber = async (phoneNumber) => {
  try {
    // Find user using phone number
    const user = await User.findOne({ phone_number: phoneNumber }).exec();

    // if user not found, return null
    if (!user) {
      return null;
    }

    // User found and all check successful, return user
    return user;
  } catch (err) {
    return null;
  }
};

/*
Get User with pid pid from the user collection
Return user if user with pid found. Otherwise, return null
*/
const getUserWithPid = async (pid) => {
  try {
    // Find user using pid
    const user = await User.findOne({ pid }).exec();

    // If user not found, return null
    if (!user) {
      return null;
    }

    // User found and all check successful, return user
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createUser,
  getUserWithEmail,
  getUserWithUsername,
  getUserWithId,
  getUserWithPhoneNumber,
  getUserWithPid,
};
