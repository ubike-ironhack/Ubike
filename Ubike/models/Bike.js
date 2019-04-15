const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bikeSchema = new Schema ({
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [Number]
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);