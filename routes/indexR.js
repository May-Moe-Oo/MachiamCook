// index.js: Great for defining general purpose routes, e.g., the root route.

var express = require("express");
var router = express.Router();


/* GET home page. */
// router.get("/", callback);
// callback = "/" -> (req, res) => { ... }
// ... = res.render('index')
// { title: 'To Insert Project name' } is link to views/index.js
router.get("/", function (req, res, next) {
  res.render("index", { title: "MachiamCook" });
});

module.exports = router;

