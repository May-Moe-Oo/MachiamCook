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
    required: "This field is required.",
  },
  ingredients: {
    type: Array,
    required: "This field is required.",
  },
  methods: {
    type: String,
    required: "This field is required.",
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
    required: "This field is required.",
  },
  image: {
    type: String,
  },
  comment: [commentSchema],
});

module.exports = mongoose.model("Recipe", recipeSchema);
