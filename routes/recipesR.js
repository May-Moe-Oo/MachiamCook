const express = require("express");
const router = express.Router();
// You'll be creating this controller module next
const recipesCtrl = require("../controllers/recipesC");
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

//* GET /recipes (everyone can see all recipes)
router.get("/",  recipesCtrl.index); // http://localhost:3000/recipes/index to add isAuth, later.

//* GET /recipes/new (User see new recipes form)
router.get("/new",  recipesCtrl.new);  //! to add isAuth, later.

//* POST /recipes (User create new recipes)
router.post("/",   recipesCtrl.create); //! now doing n to add isAuth, later.

//* GET /recipes/:id (User see 1 recipe)
router.get("/:id",   recipesCtrl.show); //! show idv recipe details n to add isAuth, later.



module.exports = router;
