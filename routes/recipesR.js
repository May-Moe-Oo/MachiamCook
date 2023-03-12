const express = require("express");
const router = express.Router();

// link controller and model
const recipesCtrl = require("../controllers/recipesC");
const User = require("../models/UserM");

// Authentication
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
router.get("/",  recipesCtrl.index); //! to add isAuth, later. http://localhost:3000/recipes

//* GET /recipes/new (User see new recipes form)
router.get("/new",  recipesCtrl.new);  //! to add isAuth, later. http://localhost:3000/recipes/new

//* POST /recipes (User create new recipes)
router.post("/",   recipesCtrl.create); //! to add isAuth, later.

//* GET /recipes/:id (User see 1 recipe)
router.get("/:id",   recipesCtrl.show); //! to add isAuth, later. http://localhost:3000/recipes/640c5ba80045144bf442787e

//* DELETE /recipes/:id (User delete the recipe)
router.delete("/:id",  recipesCtrl.delete); //! to add isAuth, later.


//* GET /recipes/:id/edit (User see an edit recipe form)
router.get("/edit/:id", recipesCtrl.edit); //! to add isAuth, later. http://localhost:3000/recipes/edit/640c85c5f5b5adbbe55eeaa1

//* PUT /recipes/:id (User update the recipe)
router.put("/edit/:id", recipesCtrl.update); //! to add isAuth, later. 


module.exports = router;
