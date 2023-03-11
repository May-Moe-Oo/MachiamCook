const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// comment model
const commentSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
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
  comment: [commentSchema],
});

module.exports = mongoose.model("Recipe", recipeSchema);
