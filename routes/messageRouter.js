const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.membership) {
    return next();
  }
  res.render("notMember", {
    message: "You must be a club member to view messages.",
  });
}

messageRouter.get("/", isLoggedIn, isMember, messageController.messagesList);

messageRouter.get(
  "/new",
  isLoggedIn,
  isMember,
  messageController.newMessageGet
);
messageRouter.post(
  "/new",
  isLoggedIn,
  isMember,
  messageController.newMessagePost
);

module.exports = messageRouter;
