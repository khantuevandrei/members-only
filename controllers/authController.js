const bcrypt = require("bcryptjs");
const passport = require("passport");
const { createUser } = require("../db/queries");

function signupGet(req, res) {
  res.render("signup");
}

async function signupPost(req, res) {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await createUser(username, hashed);
  res.redirect("/login");
}

function loginGet(req, res) {
  res.render("login", { error: null });
}

function loginPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render("login", { error: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/messages");
    });
  })(req, res, next);
}

function logout(req, res) {
  req.logout(() => res.redirect("/"));
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logout,
};
