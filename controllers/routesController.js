var express = require("express");
const validator = require('email-validator');
const sgMail = require('@sendgrid/mail');
let projectList = require("./portfolioController")
let projectInfo = require("./projectInfoController")

var router = express.Router();


// Required Model
const Code = require("../models/Code.js");

// ====================================
//      Routing
// ====================================

// Homepage Route
router.get('/', function (req, res) {
    let hbsObject = {
      title: "Homepage - Michael Kallgren",
      homepage: 'pf__navbar-tab--active',
      results: res
    }
    // console.log("hbsObj for rendering: " + JSON.stringify(hbsObject), null, 2);
    res.render("homepage.handlebars", hbsObject);
  });
  
  //Portfolio Route
  router.get('/portfolio', function (req, res) {
    let hbsObject = {
      title: "Portfolio - Michael Kallgren",
      portfolio: 'pf__navbar-tab--active',
      projects: projectList,
      projectInfo: projectInfo,
    }
    res.render("portfolio.handlebars", hbsObject);
  });
  
  //Contact-Page Route
  router.get('/contact', function (req, res) {
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
            contact: 'pf__navbar-tab--active',
            results: result
          }
          // console.log("hbsObj for rendering: " + JSON.stringify(hbsObject, null, 2));
          res.render("contact.handlebars", hbsObject);
        }
      });
  
  });
  
  // POST Message Route
  router.post('/contact', function (req, res) {
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
      //sendMessage(req.body);
      sendMessageTwo(req.body);
  
      hbsObject.sent = true;
      res.send(hbsObject)
    }
  });
  
  // A test GET route to make sure I can get the country codes!
  // A GET request for the saved articles
  router.get('/codes', function (req, res) {
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
            title: "Michael Kallgren - Contact",
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
  
  
  // Sends the email using nodemailer (old version of portfolio)
  //+++++++++++++++++++++++++++++++++++++++++++++++++
    // var sendMessage = (msgObj) => {
    //   const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'contact.mkallgren08@gmail.com',
    //       pass: process.env.GPASS || process.env.P_PASS
    //     }
    //   });
  
    //   var mailOptions = {
    //     from: msgObj.email,
    //     to: 'contact.mkallgren08@gmail.com',
    //     subject: 'New Message From ' + msgObj.name,
    //     text: 'Name: ' + msgObj.name
    //       + '\nE-mail: ' + msgObj.email
    //       + '\nPhone: (' + msgObj.countryCode + ')' + msgObj.phone
    //       + '\nPreferred method of contact: ' + msgObj.prefMethod
    //       + '\n\nMessage:\n\n ' + msgObj.message
    //   };
  
    //   transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //       console.log("Error: " + error);
    //     } else {
    //       console.log('Mail contents: ' + JSON.stringify(mailOptions, null, 2))
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
    // }
  
  
  // Sends the email using sendgrid
  //+++++++++++++++++++++++++++++++++++++++++++++++++
  var sendMessageTwo = (msgObj) => {
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'mkallgren08@gmail.com',
      from: msgObj.email,
      subject: 'Contact Page: New Message from ' + msgObj.name,
      text: msgObj.message + "\n *Preferred Method of Contact: " +
      +msgObj.prefMethod + "\n *Phone Number: (" + msgObj.countryCode + ')' + msgObj.phone
      //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    console.log(msg);
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++
  
  // ====================================
  //      Misc
  // ====================================
  
  // Test console.log() to make sure the sendgrid_api_key is configured correctly
  // console.log("SendGrid API Key: " + process.env.SENDGRID_API_KEY)

  // Export routes for server.js to use.
module.exports = router;