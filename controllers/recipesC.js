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

const show = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      res.status(404).send("Recipe not found.");
    } else {
      // res.send("show new recipes page");
      res.render("recipes/show", { recipe: recipe });
    }
  } catch (error) {
    res.send(error);
  }
};

const del = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findByIdAndDelete(recipeId).exec();
    // res.send("deleted a recipe");
    res.redirect("/recipes");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  index,
  new: newRecipes,
  create,
  delete: del,
  //   update,
  //   edit,
  show,
};
