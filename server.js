var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const sessionStore = MongoStore.create({
  mongoUri: process.env.DATABASE_URI,
  collectionName: "sessions",
});

require("dotenv").config();
require("./config/database");

//routes folder
var indexRouter = require("./routes/indexR");
const recipesRouter = require("./routes/recipesR");
const usersRouter = require("./routes/usersR");
const reviewsRouter = require("./routes/reviewsR");
var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("trust proxy", 1); // trust first proxy

// middleware
app.use(methodOverride("_method"));
app.use(
  session({
    name: "my cookie",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
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
app.use("/", reviewsRouter); // views/recipes/:id/review

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
