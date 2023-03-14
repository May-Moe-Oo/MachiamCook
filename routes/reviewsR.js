const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsC.js");
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

//! to continue
//* Post to url -> /recipes/:id/reviews
//! http://localhost:3000/recipes/640f25e0009fc3d437a4ccb3/reviews
router.post("/recipes/:id/reviews", reviewsController.createReview); //! to add isAuth, later.

module.exports = router;
