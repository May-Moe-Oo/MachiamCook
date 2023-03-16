var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");

const session = require("express-session");

require("dotenv").config();
require("./config/database");

//routes folder
var indexRouter = require("./routes/indexR");
const recipesRouter = require("./routes/recipesR");
const usersRouter = require("./routes/usersR");
const reviewsRouter = require("./routes/reviewsR");
const MongoStore = require("connect-mongo");
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
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URI,
      collectionName: "sessions",
      dbName: "MechCook",
    }),
    //cookie: { secure: true },
  })
);

app.use(function (req, res, next) {
  console.log("Current Time!");
  res.locals.time = new Date().toLocaleTimeString(); 
  next(); 
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mounting to views paths and routes folder
app.use("/", indexRouter);
app.use("/users", usersRouter); 
app.use("/recipes", recipesRouter);
app.use("/", reviewsRouter); 

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
