var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
				 "mongodb://localhost/sherpa-offroad");

module.exports.Product= require("./products.js");