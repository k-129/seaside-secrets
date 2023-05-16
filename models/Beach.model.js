const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const beachSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      lat: {type: Number}, 
      lng: {type: Number}
    },
    filters: {
      type: String,

    },
    rating: {
      type: Number
    },
    imageUrl: {type:String}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Beach = model("Beach", beachSchema);

module.exports = Beach;
