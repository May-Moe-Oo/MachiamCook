const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsC.js");
const User = require("../models/UserM");

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

router.post("/recipes/:id/reviews", isAuth, reviewsController.createReview); 

module.exports = router;
