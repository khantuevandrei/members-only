const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

require("dotenv").config();

require("./passport");

const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", authRouter);
app.use("/messages", messageRouter);

app.get("/", (req, res) => res.render("index"));

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server running, listening on port ${PORT}`)
);
