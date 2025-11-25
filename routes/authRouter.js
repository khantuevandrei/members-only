const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.get("/signup", authController.signupGet);
authRouter.post("/signup", authController.signupPost);

authRouter.get("/login", authController.loginGet);
authRouter.post("/login", authController.loginPost);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
