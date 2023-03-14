const Recipe = require("../models/RecipeM");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */

//! to continue
const createComment1 = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId).exec();
    recipe.comment.push(req.body);
    await recipe.save();
    console.log("123" , recipe);
    // res.send("recipe review");
    res.redirect(`/recipes/${recipeId}`);
  } catch (error) {
    // res.send(req.params);
    res.status(500).send("Comment Server Error");
  }
};

const createReview = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).exec();
    recipe.review.push(req.body);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating review");
  }
};


module.exports = {
  createReview,
};
