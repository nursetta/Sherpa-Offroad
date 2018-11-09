var db = require('./models');

var product = [{
	// username: "nursetta",
	// password: "1234",
	// password_confirmation: "1234",
	
	product_info: {
	    image_url: " ",
	    year: "2011+",
	    make: "Toyota",
	    model: "4Runner",
	    name: "GX470 Hybrid Front Tube Bumper by Lil B's",
		price: 1395,
		description: "This battle tested hybrid tube bumper for the GX470 vastly increases clearance and aproach angles. This bad boy comes winch ready, with multipe accessory light mounting locations.",
		shipping_price: 250,
		quantity_in_stock: 1,
	}
}];

db.Product.remove({}, function(err, products){
	if (err) { return console.log ('err', err); 
	} else {
		console.log('removed all items');
	db.Product.create(product, function (err, products){
		if (err) { return console.log ('error:', err);
	}
		console.log("created", product.length, "products");
		process.exit();
		});
	}
	// db.Product.collection.drop();	
});