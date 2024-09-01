import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId).select('-password');
    const user = await User.findById(req.body.userId).select('-password'); // Get user ID from request body

    if (!doctor || !user) {
      return res.status(404).json({
        success: false,
        message: "Doctor or User not found",
      });
    }

    const doctorId = doctor._id.toString();
    const userId = user._id.toString();

    console.log(doctorId);

    const booking = new Booking({
      doctor: doctorId,
      user: userId,
      ticketPrice: doctor.ticketPrice,
      appointmentDate: new Date(),
      status: "pending",
      isPaid: true,
    });

    await booking.save();

    // Add booking reference to doctor and user
    doctor.appointments.push(booking._id);
    user.appointments.push(booking._id);

    await doctor.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Booking Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred, booking failed.",
    });
  }
};
