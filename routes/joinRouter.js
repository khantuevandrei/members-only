const express = require("express");
const joinRouter = express.Router();
const joinController = require("../controllers/joinController");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

joinRouter.get("/", isLoggedIn, joinController.joinGet);
joinRouter.post("/", isLoggedIn, joinController.joinPost);

module.exports = joinRouter;
