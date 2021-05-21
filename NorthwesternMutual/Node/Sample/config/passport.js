const { User } = require("../services/services");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.getUserWithId(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Local Strategy for SIGNUP
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // If email not found, create new user with given email, password and pid
          const { user, err } = await User.createUser(req.body);

          if (err) {
            return done(err);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Local strategy for SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          // Get the user using the email
          const user = await User.getUserWithUsername(username);

          // If user is not found, return user not found message
          if (!user) {
            return done(null, null, { message: "Username not found" });
          }

          // If user is found but password cannot be validated, return wrong password
          if (!(await user.validatePassword(password))) {
            return done(null, null, { message: "Wrong Password" });
          }

          // User is found and password validated, return the user
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
