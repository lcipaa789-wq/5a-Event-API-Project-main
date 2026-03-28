const express = require("express");
const logger = require("morgan");

const connectToMongoDB = require("./database/connectToMongoDB");

const app = express();

const PORT = 3000;

app.use(logger("dev"));
app.use(express.json());

const usersRouter = require("./routes/users/users-router");
app.use("/api/v1/users", usersRouter);
const eventsRouter = require("./routes/events/events-router");
app.use("/api/v1/events", eventsRouter);
const bookingsRouter = require("./routes/bookings/booking-router");
app.use("/api/v1/bookings", bookingsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
  connectToMongoDB();
});
/*
Stretch• Goals:
-When returning bookings, populate the event and user fields with the  proper information
-add a route in users router that will return all of the events
booked by a single user
 add- an update route for booking specifically designed to cancel their attendance
*/
