const express = require("express");
const { createBooking, cancelBooking } = require("./bookings-controller");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.json({
      message: "success",
      payload: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//route to cancel
//patch
router.patch("/:id/cancel", async (req, res) => {
  try {
    const canceledBooking = await cancelBooking(req.params.id);
    res.json({
      message: "success",
      payload: canceledBooking,
    });
  } catch (error) {
    res.status(404).json({
      message: "failure",
      payload: error.message,
    });
  }
});
module.exports = router;
