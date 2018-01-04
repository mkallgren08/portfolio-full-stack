// ====================================
//      Dependencies
// ====================================

const bodyParser = require("body-parser")
const logger = require("morgan")
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const validator = require('email-validator')


// Controller Dependencies
const projectList = require("./controllers/portfolioController.js")
// const phoneValidator = require("./controllers/phoneValidator.js")

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Required Model
const Code = require("./models/Code.js");

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
  extended: false
}));
app.use(logger("dev"));

// ====================================
//      Database Setup with Mongoose
// ====================================

// Database configuration with mongoose
//mongoose.connect("mongodb://heroku_086slhkf:t96inaqlc3krouapt7t4uvf6rd@ds139984.mlab.com:39984/heroku_086slhkf")
//mongoose.connect('mongodb://localhost/scraper');
let connectionURI = process.env.MONGODB_URI || 'mongodb://localhost/countrycodesdb'

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

// ====================================
//      Routing
// ====================================

// Homepage Route
app.get('/', function (req, res) {
  let hbsObject = {
    title: "Homepage - Michael Kallgren",
    homepage: 'active',
    results: res
  }
  // console.log("hbsObj for rendering: " + JSON.stringify(hbsObject), null, 2);
  res.render("homepage.handlebars", hbsObject);
});

//Portfolio Route
app.get('/portfolio', function (req, res) {
  let hbsObject = {
    title: "Portfolio - Michael Kallgren",
    portfolio: 'active',
    projects: projectList
  }
  res.render("portfolio.handlebars", hbsObject);
});

//Contact-Page Route
app.get('/contact', function (req, res) {
  Code.find({})
    // Now, execute the rest of the query
    .exec(function (error, result) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        let hbsObject = {
          title: "Contact - Michael Kallgren",
          contact: 'active',
          results: result
        }
        console.log("hbsObj for rendering: " + JSON.stringify(hbsObject, null, 2));
        res.render("contact.handlebars", hbsObject);
      }
    });

});

// POST Message Route
app.post('/contact', function (req, res) {
  console.log('req.body: ' + JSON.stringify(req.body, null, 2))

  let hbsObject = {
    title: "Contact - Michael Kallgren",
    active: 'contact',
  }

  let hbsHomeObject = {
    title: "Homepage - Michael Kallgren",
    active: 'homepage',
  }

  let email_check = validator.validate(req.body.email);

  let phone_check = true;

  if (req.body.phone !== "Not provided") {
    let phoneValidationNoChar = /[a-zA-Z]|[!@$%^&*;\\/|<>"']/g
    let phoneValidationNumNumbers = /\d/g


    if (req.body.phone.match(phoneValidationNoChar) ||
      req.body.phone.match(phoneValidationNumNumbers).length < 8) {
      phone_check = false;
    } else {
      console.log("valid phone number found!")
    }
  }


  if (email_check == false || phone_check == false) {
    hbsObject.name = req.body.name
    if (req.body.phone !== "Not provided") {
      hbsObject.phone = req.body.phone
    }
    hbsObject.email = req.body.email
    hbsObject.message = req.body.message
    hbsObject.prefMethod = req.body.prefMethod
    if (email_check == false) {
      hbsObject.alert = "We were unable to validate your email. Please check your address' spelling. " +
        'If the problem persists, please email "contact.mkallgren08@gmail.com" directly using your mail ' +
        'service of choice.'
    } else if (phone_check == false) {
      hbsObject.alert = "Please check the format of your phone number. Try " +
        "writing the number with no spaces or characters (i.e. '( )', '-', etc.) and " +
        "be sure to use the dropdown menu to find your country code."
    }

    res.send(hbsObject);

  } else {
    sendMessage(req.body);

    hbsObject.sent = true;
    res.send(hbsObject)
  }
});

// A test GET route to make sure I can get the country codes!
// A GET request for the saved articles
app.get('/codes', function (req, res) {
  // Grab every doc in the Article collection
  Code.find({})
    // Now, execute the rest of the query
    .exec(function (error, result) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        var hbsObject = {
          title: "BBC Scraped News",
          savedActive: 'active',
          results: result
        }
        console.log("hbsObj for rendering: " + JSON.stringify(hbsObject), null, 2);
        //   res.send(result);
        res.send(result);
      }
    });
});

// ====================================
//      Functions
// ====================================


// Sends the email
//+++++++++++++++++++++++++++++++++++++++++++++++++
var sendMessage = (msgObj) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'contact.mkallgren08@gmail.com',
      pass: process.env.GPASS || process.env.P_PASS
    }
  });

  var mailOptions = {
    from: msgObj.email,
    to: 'contact.mkallgren08@gmail.com',
    subject: 'New Message From ' + msgObj.name,
    text: 'Name: ' + msgObj.name
    + '\nE-mail: ' + msgObj.email
    + '\nPhone: (' + msgObj.countryCode + ')' + msgObj.phone
    + '\nPreferred method of contact: ' + msgObj.prefMethod
    + '\n\nMessage:\n\n ' + msgObj.message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log('Mail contents: ' + JSON.stringify(mailOptions, null, 2))
      console.log('Email sent: ' + info.response);
    }
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++

// ====================================
//      Misc
// ====================================
