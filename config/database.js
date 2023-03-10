const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI); // need to match the .evn name either URL or URI

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

//* no need to module.exports/
