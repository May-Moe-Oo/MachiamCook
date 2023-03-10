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
    res.status(403).send(req.session);
  }
};

router.get("/home", usersController.homepage);  //* GET /users (User can see welcome message)
router.get("/login", usersController.index);
router.post("/login", usersController.login);
router.get("/seed", usersController.seed);
router.get("/secret", isAuth, usersController.secret);

// router.post("/logout", usersController.index);

module.exports = router;

