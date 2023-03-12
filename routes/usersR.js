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

//* GET /users (User can see welcome message)
router.get("/home", usersController.homepage); //! http://localhost:3000/users/home
router.get("/login", usersController.indexLogIn);
router.post("/login", usersController.login);
router.get("/seed", usersController.seed);
router.get("/secret", isAuth, usersController.secret);
router.get("/logout", usersController.indexLogOut);
//* POST /users/logout.ejs (log out user page)
router.post("/logout", usersController.logout);  


//* GET /user (User can see submited all recipes)
router.get("/book", usersController.book);  //! to add isAuth, later. http://localhost:3000/users/book

//* GET /user/:id (User see 1 recipe) 
router.get("/:id", usersController.details); //! to add isAuth, later. http://localhost:3000/users/640c85c5f5b5adbbe55eeaa1


module.exports = router;

