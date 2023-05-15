const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const beachSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tips: {
      type: String,
      required: true,
    },
    filters: {
      type: String,
      required: true,
    },
    imageUrl: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Beach = model("Beach", beachSchema);

module.exports = Beach;
