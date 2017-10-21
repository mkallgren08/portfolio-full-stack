// ====================================
//      Dependencies
// ====================================

const bodyParser = require("body-parser")
const logger = require("morgan")
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Controller Dependencies
const projectList = require("./controllers/portfolioController.js")

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Required Models

// Initialize Express
const app = express();
// Set the port to use as a variable.
const port = process.env.PORT || 3000;


// Sets up the main handlebars page (main.hbs) to serve our web apps pages
// Sets the viewing engine of the app to handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Use body-parser and morgan with the app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(logger("dev"));

// set the app to listen for a server connection
app.listen(port, function () {
    console.log('App listening on port ' + port)
})

// ====================================
//      Routing
// ====================================

// Homepage Route
app.get('/', function (req, res) {
    let hbsObject = {
        title: "Homepage - Michael Kallgren",
        active: 'homepage',
        results: res
    }
    // console.log("hbsObj for rendering: " + JSON.stringify(hbsObject), null, 2);
    res.render("homepage.handlebars", hbsObject);
});

//Portfolio Route
app.get('/portfolio', function (req, res) {
    let hbsObject = {
        title: "Portfolio - Michael Kallgren",
        active: 'portfolio',
        projects: projectList
    }
    // console.log("hbsObj for rendering: " + JSON.stringify(hbsObject), null, 2);
    res.render("portfolio.handlebars", hbsObject);
});

//Contact-Me Route
app.get('/contact', function (req, res) {
    let hbsObject = {
        title: "Contact - Michael Kallgren",
        active: 'contact',
    }
    // console.log("hbsObj for rendering: " + JSON.stringify(hbsObject), null, 2);
    res.render("contact.handlebars", hbsObject);
});