const express = require("express");
const router = express.Router();

// link controller and model
const recipesCtrl = require("../controllers/recipesC");
const User = require("../models/UserM");

// Authentication
const isAuth = async (req, res, next) => {
  // console.log(req.session);
  try {
    if (req.session.user.user_id) {
      const user = await User.findById(req.session.user.user_id).exec();
      // console.log(user);
      res.locals.user = user;
      next(); // run to next function
    }
  } catch (error) {
    // res.send(error);
    res.status(401).send("Unauthorized, Access denied. Please login");
    // res.status(500).send("Internal Server Error");
  }
};

//* GET /recipes (everyone can see all recipes)
router.get("/", isAuth, recipesCtrl.index); //! to add isAuth, later. http://localhost:3000/recipes

//* GET /recipes/new (User see new recipes form)
router.get("/new", isAuth, recipesCtrl.new);  //! to add isAuth, later. http://localhost:3000/recipes/new

//* POST /recipes (User create new recipes)
router.post("/", isAuth, recipesCtrl.create); //! to add isAuth, later.

//* GET /recipes/:id (User see 1 recipe)
router.get("/:id", isAuth, recipesCtrl.show); //! to add isAuth, later. http://localhost:3000/recipes/640c5ba80045144bf442787e

//* DELETE /recipes/:id (User delete the recipe)
router.delete("/:id", isAuth, recipesCtrl.delete); //! to add isAuth, later.


//* GET /recipes/:id/edit (User see an edit recipe form)
router.get("/edit/:id", isAuth, recipesCtrl.edit); //! to add isAuth, later. http://localhost:3000/recipes/edit/640c85c5f5b5adbbe55eeaa1

//* PUT /recipes/:id (User update the recipe)
router.put("/edit/:id", isAuth, recipesCtrl.update); //! to add isAuth, later. 


module.exports = router;
