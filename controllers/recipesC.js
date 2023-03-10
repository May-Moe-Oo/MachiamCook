/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

//? example
// const create = (req, res) => {
     //res.send("flights post / from controller");
//   console.log("body", req.body);
//   debug("body %o", req.body);
//   Flight.create(req.body)
//     .then((flight) => {
         // res.send(flight);
//     })
//     .catch((error) => res.send(error));
//   res.redirect("/flights"); // redirect to index home page that show all flights
// };

const index = async (req, res) => {
  try {
    const recipes = await Recipe.find().exec();
    const context = { recipes };
    res.render("recipes/index", context);
  } catch (error) {
    res.send(error);
  }
};



module.exports = {
  index,
//   new: newRecipes,
//   create,
//   delete: del,
//   update,
//   edit,
//   show,
};
