const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeSchema = new Schema ({
    position: {
      type: {
        type: String,
        default: "Point"
      },
      owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
      },
      coordinates:[Number]
    }
  },
  { timestamps: true }
);

bikeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Bike", bikeSchema);