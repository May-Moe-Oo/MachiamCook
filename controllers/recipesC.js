/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const Recipe = require("../models/RecipeM"); // models file -> RecipeM.js 

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

// show recipe details
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


//add delete recipe
const del = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findByIdAndDelete(recipeId).exec();
    // res.send("deleted a recipe");
    res.redirect("/users/book");
  } catch (error) {
    res.send(error);
  }
};

// edit recipe
// http://localhost:3000/recipes/edit/640db0de4d221090732d5b4e
const edit = async (req, res) => {
  try {
    const { id } = req.params; 
    const recipe = await Recipe.findById(id).exec();
    const context = { id, recipe};
    // res.send("edit a recipe page");
    res.render("recipes/edit.ejs", context);
  } catch (error) {
    res.send(error);
  }
};



// update recipe 
// http://localhost:3000/recipes/edit/640db0de4d221090732d5b4e

const update = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, methods, category, duration, image } = req.body;
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { name, ingredients, methods, category, duration, image },
      { new: true }
    ).exec();
    // res.json(recipe);
    // res.send("updated a recipe");
    res.redirect("/users/book");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};



module.exports = {
  index,
  new: newRecipes,
  create,
  show,
  delete: del,
  update,
  edit,
};