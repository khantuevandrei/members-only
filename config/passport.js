const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const { findUserByUsername, findUserById } = require("../models/userModel");

passport.use(
  new LocalStrategy(async (findUserByUsername, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user) return done(null, false, { message: "incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
