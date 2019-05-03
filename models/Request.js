const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requestSchema = new Schema ({
    biker: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    bike: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bike"
    }
  },
  { timestamps: true}
);
