const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// review model
const reviewSchema = new Schema(
  {
    userName: {
      type: String, // objectID link to userName
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// recipe model
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  methods: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    enum: [
      "less than 15 minutes",
      "15-30 minutes",
      "30-45 minutes",
      "45-60 minutes",
      "more than 1 hour",
    ],
    required: true,
  },
  category: {
    type: String,
    enum: ["Entrée", "Soup", "Main", "Dessert"],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  review: [reviewSchema],
});
 
module.exports = mongoose.model("Recipe", recipeSchema);
