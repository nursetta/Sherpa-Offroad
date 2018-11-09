var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProductSchema = new Schema({

	// username: String,
	// password: String,
	// password_confirmation: String,
	
	product_info: {
		image_url: String,
		year: String,
		make: String,
		model: String,
		name: String,
		price: Number,		
		description: String,
		shipping_price: Number,
		quantity_in_stock: Number
	},
});

// ProductSchema.statics.hashPassword = function(password, cb){
//   bcrypt.hash(password, null, null, cb);
// };
// ProductSchema.methods.validatePassword = function(password, cb){
//   bcrypt.compare(password, this.password, cb);
// };

// ProductSchema.plugin(passportLocalMongoose);

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
