const express = require("express");
const router = express.Router();
// You'll be creating this controller module next
const recipesCtrl = require("../controllers/recipesC");



//* GET /recipes (User can see all recipes)
// router.get("/", recipesCtrl.index);

//* GET /recipes/new (User see new recipes form)
// router.get("/new", recipesCtrl.new);

//* POST /recipes (User create new recipes)
// router.post("/", recipesCtrl.create);

//* GET /recipes/:id (User see 1 recipe)
// router.get("/:id", recipesCtrl.show);

//* GET /recipes/:id/edit (User see an edit recipe form)
// router.get("/:id", recipesCtrl.edit);

//* PUT /recipes/:id (User update the recipe)
// router.put("/:id", recipesCtrl.update);

//* DELETE /recipes/:id (User delete the recipe)
// router.delete("/:id", recipesCtrl.delete);

module.exports = router;
