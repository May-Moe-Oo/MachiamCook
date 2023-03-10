var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersC");
const User = require("../models/UserM");

const isAuth = async (req, res, next) => {
  if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
  } else {
    res.status(403).send("Error, Please login");
  }
};

router.get("/home", usersController.homepage);  //* GET /users (User can see welcome message)
router.get("/login", usersController.indexLogIn);
router.post("/login", usersController.login);
router.get("/seed", usersController.seed);
router.get("/secret", isAuth, usersController.secret);
router.get("/logout", usersController.indexLogOut);
router.post("/logout", usersController.logout); //* POST /users/logout.ejs (log out user page) 

module.exports = router;

