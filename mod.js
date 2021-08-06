var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String, required: true},
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    specialization: { type: String, required: true },
    creation_dt: { type: String, required: true }
});


module.exports = mongoose.model("Agent", schema);
