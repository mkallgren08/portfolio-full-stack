// ======================
//      Dependencies
// ======================

const mongoose = require("mongoose");
// Create a Schema class
const Schema = mongoose.Schema;

// Make the Article Schema here:
var CodeSchema = new Schema({
    // The link is another required string
    text: {
        type: String,
        required: true
    },
    abbr: {
        type: String
    },
    code: {
        type: String 
    }
});

// Now we actually make the Article model using the ArticleSchema
const Code = mongoose.model("Code", CodeSchema);

// Export the model
module.exports = Code;