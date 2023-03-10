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

//* GET /recipes (User can see all recipes)
router.get("/", isAuth, recipesCtrl.index); // http://localhost:3000/recipes/index

//* GET /recipes/new (User see new recipes form)
router.get("/new", isAuth, recipesCtrl.new); //! now doing

//* POST /recipes (User create new recipes)
router.post("/", isAuth, recipesCtrl.create); //! now doing

//* GET /recipes/:id (User see 1 recipe)
// router.get("/:id", recipesCtrl.show);

//* GET /recipes/:id/edit (User see an edit recipe form)
// router.get("/:id", recipesCtrl.edit);

//* PUT /recipes/:id (User update the recipe)
// router.put("/:id", recipesCtrl.update);

//* DELETE /recipes/:id (User delete the recipe)
// router.delete("/:id", recipesCtrl.delete);

module.exports = router;
