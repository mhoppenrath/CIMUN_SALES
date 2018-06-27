// Dependencies
var http = require("http");
var dbURL= "otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
var PORT = process.env.PORT || 9000;
var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//the section for setting up the db
////////////////////////////////////////////////////////////

var dbMethods = require('./controllers/dbMethod.js');
var models = require('./models'); // Pulls out the potluck Models

// Extracts the sequelize connection from the models object makes the various assocation
var sequelizeConnection = models.sequelize;
dbMethods.associate();


sequelizeConnection.sync({force: true}).then(dbMethods.initTables).then(dbMethods.initDummies);
//////////////////////////////////////////////////////////////////////

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
var router = require('./routes/htmlRoutes.js');
app.use('/', router);


//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Starts our server.
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
