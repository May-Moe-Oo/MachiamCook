/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const Recipe = require("../models/RecipeM"); // where the models file and RecipeM.js name

//view all recipes
const create = async (req, res) => {
  try {
    console.log("body", req.body);
    const recipe = await Recipe.create(req.body);
    //res.send("all recipes page");
    res.redirect("recipes");
  } catch (error) {
    res.send(error);
  }
};

//add new recipe
const newRecipes = async (req, res) => {
  try {
    // res.send("add new recipes page");
    res.render("recipes/new");
  } catch (error) {
    res.send(error);
  }
};

const index = async (req, res) => {
  try {
    const recipes = await Recipe.find().exec();
    const context = { recipes };
    res.render("recipes", context);
  } catch (error) {
    res.send(error);
  }
};


// router.post('/', function(req, res, next) {
//     try {
//         const {Name,Ingredients,Cuisine}=req.body;
//         const newRecipe=new RecipeModel({Name,Ingredients,Cuisine})
//         newRecipe.save();
    
//         return res.status(200).send({message:"Data has been added!",data:newRecipe})
    
//     } catch (error) {
//         return res.status(400).send({message:"Error Occured!",error:error.message})
//     }
// });


module.exports = {
  index,
  new: newRecipes,
  create,
//   delete: del,
//   update,
//   edit,
//   show,
};
