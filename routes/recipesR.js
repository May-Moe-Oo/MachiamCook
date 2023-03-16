const express = require("express");
const router = express.Router();


const recipesCtrl = require("../controllers/recipesC");
const User = require("../models/UserM");

// Authentication
const isAuth = async (req, res, next) => {
  try {
    if (req.session.user.user_id) {
      const user = await User.findById(req.session.user.user_id).exec();
      res.locals.user = user;
      next();
    } else {
      const context = { msg: "Unauthorized, Access denied. Please login." };
      res.render("users/login", context);
    }
  } catch (error) {
    const context = { msg: "Unauthorized, Access denied. Please login." };
    res.render("users/login", context);
  }
};

//* GET /recipes (everyone can see all recipes)
router.get("/", isAuth, recipesCtrl.index); 

//* GET /recipes/new (User see new recipes form)
router.get("/new", isAuth, recipesCtrl.new);  

//* POST /recipes (User create new recipes)
router.post("/", isAuth, recipesCtrl.create); 

//* GET /recipes/:id (User see 1 recipe)
router.get("/:id", isAuth, recipesCtrl.show); 

//* DELETE /recipes/:id (User delete the recipe)
router.delete("/:id", isAuth, recipesCtrl.delete); 


//* GET /recipes/:id/edit (User see an edit recipe form)
router.get("/edit/:id", isAuth, recipesCtrl.edit); 

//* PUT /recipes/:id (User update the recipe)
router.put("/edit/:id", isAuth, recipesCtrl.update); 


module.exports = router;
