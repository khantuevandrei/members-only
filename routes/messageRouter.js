const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

messageRouter.get("/", messageController.messagesList);

messageRouter.get("/new", isLoggedIn, messageController.newMessageGet);
messageRouter.post("/new", isLoggedIn, messageController.newMessagePost);

module.exports = messageRouter;
