const User = require("../models/UserM");

const bcrypt = require("bcrypt"); // hashing pw
//! hashing https://github.com/kelektiv/node.bcrypt.js
const saltRounds = 10; // hashing pw

// for 1 person password hashing. Project need to do many.
const seed = async (req, res) => {
  const plainTextPassword = "123";
  bcrypt.hash(plainTextPassword, saltRounds, async (err, hash) => {
    const user = await User.create({
      userid: "May",
      password: hash,
      userName: "May",
      userRole: "User",
    });
    res.send(user);
  });
};

const seed2 = async (req, res) => {
  const plainTextPassword = "123456";
  bcrypt.hash(plainTextPassword, saltRounds, async (err, hash) => {
    const user = await User.create({
      userid: "Admin",
      password: hash,
      userName: "Admin",
      userRole: "Admin",
    });
    res.send(user);
  });
};

const indexLogIn = async (req, res) => {
  const context = { msg: "" }; // so that the error msg.
  // res.send ("Try again"); // at http://localhost:3000/ click on login button
  res.render("users/login", context); // will go to http://localhost:3000/users/login
}; 


//* /users/login POST so user id is inside the body
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const login = async (req, res) => {
  const { userid, password } = req.body;

  //userid wrong -> failure
  const user = await User.findOne({ userid }).exec();
  console.log(user);

  if (user === null) {
    const context = { msg: "Invalid login credentials. Please try again." };
    // user id is wrong so send back to user login pg
    // res.redirect("/users");
    res.render("users/login", context);
    return; // stop here and not send to user, if not server will crash.
  }

  // userid, userName, password & userRole are correct -> successful login. & Password wrong -> failure
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.user = {
        user_id: user._id,
        userRole: user.userRole,
        userName: user.userName,
      };
      // req.session.isLoggedIn = true; // add in this line 15.3.2023
      console.log(req.session);
      // res.send("Log in was success");
      res.redirect("/users/home"); //! successful login when userid, userName, password & userRole are correct. redirct to user's home page.
    } else {
      const context = { msg: "Beep! Beep! Beep! Password wrong" };
      res.render("users/login", context);
    }
  });
};

const secret = (req, res) => {
  res.send("The secret is with you");
};

const homepage = async (req, res) => {
  try {

      res.render("users/home"); 
  } catch (error) {
    res.send(error);
  }
};


const indexLogOut = async (req, res) => {
  // res.session
req.session.destroy();
  res.render("users/logout");
};

const logout = async (req, res) => {
  try {
    await req.session.destroy();
    //res.send("logout");
    res.redirect("users/logout"); // to show that user has successfully logged out.
  } catch (error) {
    res.send(error);
  }
};

//!
const Recipe = require("../models/RecipeM");

const book2 = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      author: req.session.user.userName,
    }).exec();
    console.log("Session:" ,req.session);
    console.log("User:" , req.session.user.userName);
    const context = { recipes };
    // res.send("my book page, just name of recipe and img. click to view");
    res.render("users/book", context);
  } catch (error) {
    res.send(error);
  }
};

const book = async (req, res) => {
  try {
      const recipes = await Recipe.find({
        author: req.session.user.userName,
      }).exec();
      if (recipes) {

        const context = { recipes };
        // res.send("my book page, just name of recipe and img. click to view");
        res.render("users/book", context);
      } else {
        // res.send("Show book, need to log in");
        res.redirect("/login");
      }
  } catch (error) {
    res.send(error);
  }
};

// show recipe details
const details = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      res.status(404).send("Recipe not found.");
    } else {
      // res.send("each of my recipe's detail page");
      res.render("users/details", { recipe: recipe });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  homepage,
  indexLogIn,
  login,
  seed,
  seed2,
  secret,
  indexLogOut,
  logout,
  book,
  details,
};
