// ====================================
//      Dependencies
// ====================================

const bodyParser = require("body-parser")
const logger = require("morgan")
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
// const nodemailer = require('nodemailer');

// Require the portfolioController
const projectList = require("./controllers/portfolioController.js")
// const phoneValidator = require("./controllers/phoneValidator.js")

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
const app = express();
// Set the port to use as a variable.
const port = process.env.PORT || 3001;


// Sets up the main handlebars page (main.hbs) to serve our web apps pages
// Sets the viewing engine of the app to handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Use body-parser and morgan with the app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger("dev"));

// Require the routes
const routes = require("./controllers/routesController");

app.use(routes);

// ====================================
//      Database Setup with Mongoose
// ====================================

// Database configuration with mongoose
//mongoose.connect("mongodb://heroku_086slhkf:t96inaqlc3krouapt7t4uvf6rd@ds139984.mlab.com:39984/heroku_086slhkf")
//mongoose.connect('mongodb://localhost/scraper');
let connectionURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/countrycodes'


// sets timers to limit how long the server attempts to establish a connection to a db
var option = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};

mongoose.connect(connectionURI, option);
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});


// set the app to listen for a server connection
app.listen(port, function () {
  console.log('App listening on port ' + port)
});



//==========================================================
//        Nodemailer Variables
//==========================================================

