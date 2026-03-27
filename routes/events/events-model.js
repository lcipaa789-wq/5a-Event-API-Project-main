const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableTickets: {
      type: Number,
      default: 100,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
