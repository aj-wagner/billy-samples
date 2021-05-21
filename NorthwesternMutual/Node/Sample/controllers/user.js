const passport = require("passport");
const { User } = require("../services/services");

// Signup route handler
const signUp = async (req, res, next) => {
  try {
    // Check that the all the form values are valid
    const {
      usernameErr,
      emailErr,
      passwordErr,
      phoneNumberErr,
    } = await User.checkForm(req.body);

    if (usernameErr || emailErr || passwordErr || phoneNumberErr) {
      return res.status(200).json({
        error: { usernameErr, emailErr, passwordErr, phoneNumberErr },
      });
    }

    // Create the user in the db through passport local strategy
    const user = await promisifiedPassportAuthentication(
      req,
      res,
      next,
      "local-signup"
    );

    // If user is null, user creation failed
    if (!user) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    return res
      .status(200)
      .json({ success: `User ${user._id} has been successfully created` });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// Sign-in route handler
const signIn = async (req, res, next) => {
  try {
    // Sign-in through passport local strategy
    const user = await promisifiedPassportAuthentication(
      req,
      res,
      next,
      "local-signin"
    );

    // If user is null, user creation failed
    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }

    // Generate session for the user so no need re-authentication
    await req.logIn(user, async function (err) {
      if (err) {
        return res.status(400).json({
          err: "Could not log in user",
        });
      } else {
        return res
          .status(200)
          .json({ success: `User ${user._id} successfully logged in` });
      }
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// Check registration form
const checkForm = async (req, res, next) => {
  try {
    // Check that all the form values are correct
    const {
      usernameErr,
      emailErr,
      passwordErr,
      phoneNumberErr,
    } = await User.checkForm(req.body);

    // If any error is found, return all errors
    if (usernameErr || emailErr || passwordErr || phoneNumberErr) {
      return res.status(400).json({
        error: { usernameErr, emailErr, passwordErr, phoneNumberErr },
      });
    }

    // All check successful
    return res.status(200).json({ success: `Form validated` });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// Passport authenticate according to localName
const promisifiedPassportAuthentication = (req, res, next, localName) => {
  return new Promise((resolve, reject) => {
    // Login or signup according to localName
    passport.authenticate(localName, (err, user, info) => {
      if (user) {
        resolve(user);
      } else {
        reject({ err, info });
      }
    })(req, res, next);
  });
};

module.exports = {
  signIn,
  signUp,
  checkForm,
};
