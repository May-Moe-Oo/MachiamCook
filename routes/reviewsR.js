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
    }
  } catch (error) {
    res.status(401).send("Unauthorized, Access denied. Please login");
  }
};

//! to continue
//* Post to url -> /recipes/:id/reviews
//! http://localhost:3000/recipes/640f25e0009fc3d437a4ccb3/reviews
router.post("/recipes/:id/reviews", isAuth, reviewsController.createReview); //! to add isAuth, later.

module.exports = router;
