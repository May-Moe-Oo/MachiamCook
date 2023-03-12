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


//* GET /user (User can see submited all recipes)
router.get("/book", usersController.book);  //! to add isAuth, later.

//* GET /recipes/:id (User see 1 recipe) 
router.get("/:id", usersController.details); //! show idv recipe details to delete and update later n to add isAuth, later.



//! to move to user routes
//* GET /recipes/:id/edit (User see an edit recipe form)
//router.get("/edit/:id",  recipesCtrl.edit); //! edit recipe details n to add isAuth, later. views/recipes/edit.ejs ???

//* PUT /recipes/:id (User update the recipe)
//router.put("/edit/:id", recipesCtrl.update); //! update recipe details n to add isAuth, later. ???


//* DELETE /recipes/:id (User delete the recipe)
//router.delete("/:id",  recipesCtrl.delete); //! del idv recipe details n to add isAuth, later.


module.exports = router;

