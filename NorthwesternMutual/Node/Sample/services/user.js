const { User } = require("../repositories/repositories");
const { v4: uuidv4 } = require("uuid");
const { regex } = require("../helpers/helpers");

/*
Create a user in the user collections using the given userInformation
Returns the user if successfully created. Otherwise, return null
*/
const createUser = async (userInformation) => {
  try {
    // Check that all required fields are not empty. This should be prevented in the frontend
    const { username, email, password, dob, phoneNumber } = userInformation;
    if (!username || !email || !password || !dob || !phoneNumber) {
      return null;
    }

    // Create a random profile id for the new user
    let pid = uuidv4();

    //  Make sure pid is unique
    while (await User.getUserWithPid(pid)) {
      pid = uuidv4();
    }

    // Create the user
    const user = await User.createUser({ ...userInformation, pid });

    return { user };
  } catch (err) {
    return null;
  }
};

/*
Check that all the values entered in the signup page is valid
Return an object containing all errors. Errors for that value is null if no error found for that field
*/
const checkForm = async ({
  username,
  email,
  phoneNumber,
  password,
  matchedPassword,
}) => {
  try {
    // Initialise all the error type as null
    let usernameErr, emailErr, phoneNumberErr, passwordErr;

    // If username is null, don't check
    if (username) {
      if (username.length < 6 || username.length > 20) {
        usernameErr = `Username must be 6-20 characters long.`;
      }

      if (await User.getUserWithUsername(username)) {
        usernameErr = `Your username is taken.`;
      }
    }

    if (email) {
      if (!(await regex.emailRegexCheck(email))) {
        emailErr = `Please enter a valid email address.`;
      }

      if (await User.getUserWithEmail(email)) {
        emailErr = `Your email address is taken.`;
      }
    }

    if (phoneNumber) {
      if (await User.getUserWithPhoneNumber(phoneNumber)) {
        phoneNumberErr = `This phone number has been used.`;
      }
    }

    if (password && matchedPassword) {
      if (password.length < 6) {
        passwordErr = `Password must at least be 6 characters long`;
      }
      if (password !== matchedPassword) {
        passwordErr = `Please make sure your password match.`;
      }
    }

    return { usernameErr, emailErr, phoneNumberErr, passwordErr };
  } catch (err) {
    throw err;
  }
};

/*
Get User with email ${email} from the user collection
Return user if user with email found. Otherwise, return null
*/
const getUserWithEmail = async (email) => {
  try {
    if (!email) {
      return null;
    }

    // Get user from DB using given username
    const user = await User.getUserWithEmail(email);

    // If user not found, return null;
    if (!user) {
      return null;
    }

    // user found and other checks successful
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
    if (!username || username.length > 20) {
      return null;
    }

    // Get user from DB using given username
    const user = await User.getUserWithUsername(username);

    // If user not found, return null;
    if (!user) {
      return null;
    }

    // user found and other checks successful
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
    if (!id) {
      return null;
    }

    // Get user from DB using given ID
    const user = await User.getUserWithId(id);

    // If user not found, return null;
    if (!user) {
      return null;
    }

    // user found and other checks successful
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
  checkForm,
};
