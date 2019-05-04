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
    confirmationCode: {
      type: String,
      unique: true
    },
    active: {
      type: Boolean,
      default: false
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
  passwordField: "password",
  findByUsername: function(model, queryParameters) {
    // Add additional query parameter - AND condition - active: true
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


