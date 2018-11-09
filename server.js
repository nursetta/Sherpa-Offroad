
var express = require("express");
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = require('./models/');

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;

var crypto = require('crypto');
var moment = require('moment');
require('dotenv').config();

 app.get('/sign_s3', function(req, res) {

        const awsAuthId = process.env.AWS_ACCESS_ID;
        // console.log(process.env.AWS_ACCESS_ID);
        const awsAuthSecret = process.env.AWS_SECRET;
        // console.log(process.env.AWS_SECRET);

        const date = new Date().toISOString().replace(/[\.\-:]/gi, "").substr(0, 15) + "Z";
        // console.log("date = " + date);
        // const date = "20181229T000000Z";
        const dateNowRaw = date.substr(0, date.indexOf("T"));
        // console.log("dateNowRaw = " + dateNowRaw);

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        const expiration = expirationDate.toISOString();
        // console.log("expiration = " + expiration);

        const credentials = awsAuthId + "/" + dateNowRaw + "/us-west-2/s3/aws4_request/";
        
        const policy = { "expiration": expiration,
                          "conditions": [
                            {"bucket": "sherpa-offroad-image-upload"},
                            ["starts-with", "$key", "public/"],
                            {"acl": "public-read"},
                            ["starts-with", "$Content-Type", "image/"],
                            {"x-amz-server-side-encryption": "AES256"},
                            ["starts-with", "$x-amz-meta-tag", ""],

                            {"x-amz-credential": credentials},
                            {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
                            {"x-amz-date": date },
                            {"success_action_status": "201"}
                          ]
                        };

        const base64Policy = new Buffer(JSON.stringify((policy), "utf-8")).toString("base64");

        const dateKey = crypto.createHmac('sha256', "AWS4" + awsAuthSecret).update(dateNowRaw).digest();
        // console.log("dateKey = " + dateKey);
        const dateRegionKey = crypto.createHmac('sha256', dateKey).update('us-west-2').digest();
        // console.log("dateRegionKey = " + dateRegionKey);
        const dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update('s3').digest();
        const signingKey = crypto.createHmac('sha256', dateRegionServiceKey).update('aws4_request').digest();
        // console.log("signingKey = " + signingKey);
        const signature = crypto.createHmac('sha256', signingKey).update(base64Policy).digest('hex');
        // console.log("signature = " + signature);

        res.status(200).json({
            signature: signature,
            policy: base64Policy,
            date: date,
            credentials: credentials,
            expiration: expiration,
            awsAuthId: awsAuthId,
            awsAuthSecret: awsAuthSecret
        });
    });

app.get('/api/product/', function(req, res){
   db.Product.find({}, function(err, product){
        if (err){
            return console.log("index error: " + err);
        }
        res.json(product);
    });
});

app.get('/api/products/:id', function (req, res) {
    db.Product.findOne({_id: req.params.id }, function(err, product) {
        if (err){
            return console.log("index error: " + err);
        }
            res.json(product);
    });
});

//PUT Method 
app.put('/api/products/:id', function (req, res) {
    var productId = req.params.id;
    var update = req.body;
        db.Product.findOneAndUpdate({_id: productId}, update, function(err, product){
        if (err) { 
            res.json({message: "error"});
            }
        res.json(product);
        });
});

app.post('/api/product/', function (req, res) {
    var product = new db.Product(req.body);
    var image_url = req.body.image_url;
    var year = req.body.year;
    var make = req.body.make;
    var model = req.body.model;
    var name = req.body.name;
    var price = req.body.price;
    var shipping_price = req.body.shipping_price;
    var quantity_in_stock = req.body.quantity_in_stock;
    var description = req.body.description;
    product.save(product, function (err, borrower) {
        if (err) {
            return console.log("post error: " + err);
        }
        res.json(product);
    });
});

// app.get('/api/borrower/:id', function (req, res) {
//     db.Borrower.findOne({_id: req.params.id }, function(err, data) {
//         if (err){
//             return console.log("index error: " + err);
//         }
//             console.log(req.user);
//             res.json(data);
//     });
// });

// //PUT Method 
// app.put('/api/borrower/:id', function (req, res) {
//     var borrowerId = req.params.id;
//     var update = req.body;
//         db.Borrower.findOneAndUpdate({_id: borrowerId}, update, function(err, borrower){
//         if (err) { 
//         	res.json({message: "error"});
//             }
//         res.json(borrower);
// 		});
// });

// app.post('/api/borrower', function (req, res) {
//     var borrower = new db.Borrower(req.body);
//     var password = req.body.password;
//     var password_confirmation = req.body.password_confirmation;
//     if (password !== password_confirmation) {
//         res.json({message: "Passwords don't match"});
//         return;
//     }
//     db.Borrower.findOne({username: req.body.username}, function (err, result) {
//         console.log(result);
//         if (err) {
//             console.log('err');
//         }
//         if (result) {
//             console.log('user already exists');
//             res.json({message: "user already exists"});
//         }
//         else {
//             db.Borrower.hashPassword(password, function (err, hash) {
//                 if (err) {
//                     console.log('err');
//                 }
//                 borrower.password = hash;
//                 borrower.save(borrower, function (err, borrower) {
//                     if (err) {
//                         return console.log("post error: " + err);
//                     }
//                     res.json(borrower);
//                 });
//             });
//         }
//     });
// });
// passport.serializeUser( function(borrower, done) {
//   console.log(borrower);
//   var sessionBorrower = { _id: borrower._id  };
//   console.log("session borrower is: "+ sessionBorrower._id);
//   done(null, sessionBorrower);
// });
// passport.deserializeUser(function(id, done) {
//     db.Borrower.findById(id, function(err, borrower) {
//         console.log('deserializing user:', borrower);
//         done(err, borrower);
//     });
// });
// app.post('/login', function login(req,res,next) {
//         passport.authenticate('local', {failureFlash: true,  },
//               function(err, borrower, info) {
//                 if(err) {return next(err);}
//                 if(!borrower){return res.json({url: '/#/login', message: info.message});}
//                 req.logIn(borrower,function(err) { //need to explicitly call req.login here, so that serializing happens: http://stackoverflow.com/questions/36525187/passport-serializeuser-is-not-called-with-this-authenticate-callback
//                     console.log(borrower);
//                     if (err) {return next(err);}
//                     return res.json({url: '/#/borrower/' + borrower._id});
//                 });
//               })(req,res,next);
//     });
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     db.Borrower.findOne({username: username}, function (err, borrower) {
//       console.log("this is the " + borrower);
//       if (err) { 
//         return done(err); 
//       }
//       if (!borrower) { 
//         return done(null, false,{message:'Provided username does not exist in our records!'}); 
//       }
//       borrower.validatePassword(password, function(err, result) {
//         console.log(password);
//         console.log(result);
//         if(err || !result){
//             return done(null,false,{message:'Incorrect password'});
//         }else {
//             return done(null, borrower);
        
//         }
//       });
//     });
//   }
// ));


app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is up and running on http://localhost:3000/');
});