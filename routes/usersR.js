var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersC");
const User = require("../models/UserM");

const isAuth = async (req, res, next) => {
  try {
    if (req.session.user.user_id) {
      const user = await User.findById(req.session.user.user_id).exec();
      res.locals.user = user;
      next(); 
    } else {
      const context = { msg: "Unauthorized, Access denied. Please login."};  
      res.render("users/login", context);
    }
  } catch (error) {
    const context = { msg: "Unauthorized, Access denied. Please login."};  
      res.render("users/login", context);
  }
};

//* GET /users (User can see welcome message)
router.get("/home", isAuth, usersController.homepage); 

//* GET /users/login (log in page)
router.get("/login", usersController.indexLogIn);

//* POST /users/login 
router.post("/login", usersController.login);

router.get("/seed", usersController.seed);
router.get("/seed2", usersController.seed2);
router.get("/secret", usersController.secret);

//* POST /users/logout 
router.get("/logout", usersController.indexLogOut);

//* POST /users/logout (log out successful page)
router.post("/logout", usersController.logout);

//* GET /user (User can see submited all recipes)
router.get("/book", isAuth, usersController.book); 

//* GET /user/:id (User see 1 recipe)
router.get("/:id", isAuth, usersController.details); 

module.exports = router;
