const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema(
  {
    local: {
      email: { type: String, required: true, unique: true },
      password: { type: String },
    },
    username: { type: String, required: true, unique: true },
    pid: { type: String, required: true, unique: true },
    email_is_verified: { type: Boolean, default: false },
    date: {
      type: Date,
      default: Date.now,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
  },
  { strict: false }
);

// Plugin for passport-local-mongoose. Automatically creates hash and salt field in mongoose
UserSchema.plugin(passportLocalMongoose);

// Generate hash
UserSchema.methods.generateHash = async function (password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.local.password);
};

// Exports user schema
module.exports = mongoose.model("User", UserSchema);
