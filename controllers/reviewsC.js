const Recipe = require("../models/RecipeM");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */

const createReview1 = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).exec();
    recipe.review.push(req.body);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Creating reviews");
  }
};

const createReview = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).exec();
    const review = {
      userName: req.session.user.userName, // set the username of the logged-in user as the reviewer name
      content: req.body.content,
    };
    console.log("review username is ", review.userName);
    recipe.review.push(review);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Creating reviews");
  }
};

module.exports = {
  createReview,
};
