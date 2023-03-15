var express = require("express");
var router = express.Router();


/* GET home page. */ //localhost:3000/
http: router.get("/", function (req, res, next) {
  res.render("index", { title: "MachiamCook" });
});

module.exports = router;

