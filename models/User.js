const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    }, 
    lastname: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    role:{
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER"
    },
    password:{
      type: String,
      required: true
    },
    image: {
      type: String
    },
    position: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates:[Number]
    }
  }, 
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordField: "password"
});

const User = mongoose.model('User', userSchema);

module.exports = User;


