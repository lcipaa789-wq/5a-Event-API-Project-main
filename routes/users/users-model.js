const mongoose = require("mongoose");
const Booking = require("../bookings/bookings-model");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    bookedEvents: {
      type: ObjectId,
      ref: Booking,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
