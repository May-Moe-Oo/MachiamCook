var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");

var session = require("express-session");
// It's very important to require dotenv before any
// module that depends upon the environment variables
// in the .env file
require("dotenv").config();
// Connect to Atlas/MongoDB AFTER the dotenv has processed the .env file
require("./config/database");

// paths to routes folder
var indexRouter = require("./routes/indexR");
const recipesRouter = require("./routes/recipesR");
const usersRouter = require("./routes/usersR");
//const reviewsRouter = require("./routes/reviewsR.js");
var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("trust proxy", 1); // trust first proxy

// middleware
app.use(methodOverride("_method"));
//! to uncomment the later must come after the methodOverride.
app.use(
  // must come after the methodOverride.
  session({
    name:"my cookie",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true },
  })
);

app.use(function (req, res, next) {
  // to delete if not using
  console.log("Current Time!");
  res.locals.time = new Date().toLocaleTimeString(); //time property
  next(); // Pass the request to the next middleware
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mounting to views paths and routes folder
app.use("/", indexRouter);
app.use("/users", usersRouter); // views/users folder
app.use("/recipes", recipesRouter);
//app.use("/", reviewsRouter); //! this code is wrong need to update later

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
