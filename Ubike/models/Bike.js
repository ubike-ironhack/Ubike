const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bikeSchema = new Schema ({
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates:[Number]
    }
  },
  { timestamps: true }
);

bikeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Bike", bikeSchema);