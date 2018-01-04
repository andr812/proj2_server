// serverjs

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// DEFINE MODEL
var pBook = require('./models/pbook');
var gall =require('./models/gallery');
var ord = require('./models/order');
// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));
app.use(bodyParser.json({limit:'20mb'}));
// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 3000;

// [CONFIGURE ROUTER]
var router = require('./route')(app, pBook, gall,ord);
// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
