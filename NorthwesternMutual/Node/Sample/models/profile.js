const mongoose = require("mongoose");

var ProfileSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    first_name: String,
    last_name: String,
    institution: String,
    subjects: [String],
    city: String,
    textbooks_history: [String],
    questions_posted: [String],
    questions_history: [String],
    quota: Number,
    subscription_start: Date,
    subscription_end: Date,
    subscription_status: String,
  },
  { strict: false }
);

// Exports user schema
module.exports = mongoose.model("Profile", ProfileSchema);
