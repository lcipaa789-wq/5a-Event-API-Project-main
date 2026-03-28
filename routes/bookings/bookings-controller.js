const { getEventById, updateEvent } = require("../events/events-controller");
const Booking = require("./bookings-model");
const createBooking = async (bookingData) => {
  try {
    //create booking
    //1. calculate total price
    //totalPrice = eventPrice*quantity
    //event - eventPrice (bookingdata.event)
    const event = await getEventById(bookingData.event);

    const totalPrice = bookingData.quantity * event.price;
    // add our totalPrice calculation to our incoming bookingData object
    bookingData.totalPrice = totalPrice;
    //2. decrease acailable tickets form event
    //calculate tickets available
    const newAvailableTickets = event.availableTickets - bookingData.quantity;
    //update event with the new amount of tickets
    //only need to update ticket amount, we don't need a variale for the event data
    await updateEvent(bookingData.event, {
      availableTickets: newAvailableTickets,
    });
    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw error;
  }
};

// function to cancel booking and change status to "cancelled"
const cancelBooking = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw Error("Booking not found");
    }
    if (booking.status === "cancelled") {
      throw Error("Booking already cancelled");
    }
    const event = await getEventById(booking.event);
    //returning tickets back
    const returnTickets = event.availableTickets + booking.quantity;
    await updateEvent(booking.event, { availableTickets: returnTickets });
    const updateBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true },
    )
      .populate("event")
      .populate("user");
    return updateBooking;
  } catch (error) {
    throw error;
  }
};
module.exports = { createBooking, cancelBooking };
