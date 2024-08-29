import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";


// get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: reviews,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
};


// create review
// export const createReview = async (req, res) => {

//     if(!req.body.doctor) req.body.doctor = req.params.doctorId;
//     if(!req.body.user) req.body.user = req.params.userId;

//     const newReview = new Review(req.body);

//     try {
//         const savedReview = await newReview.save();

//         await Doctor.findByIdAndUpdate(req.body.doctor, {
//             $push: { reviews: savedReview._id },
//         });

//         res.status(200).json({
//             success: true,
//             message: "Review submitted successfully",
//             data: savedReview,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };


export const createReview = async (req, res) => {
    try {
      // Ensure the doctor and user IDs are set
      const doctorId = req.body.doctor || req.params.doctorId;
      const userId = req.body.user || req.params.userId;
  
      // Check if the doctor and user exist
      const doctor = await Doctor.findById(doctorId);
      const user = await User.findById(userId);
  
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Create a new review
      const newReview = new Review({
        doctor: doctorId,
        user: userId,
        reviewText: req.body.reviewText,
        rating: req.body.rating,
      });
  
      const savedReview = await newReview.save();
  
      // Add the review reference to the doctor's reviews array
      doctor.reviews.push(savedReview._id);
      await doctor.save();
  
      res.status(200).json({
        success: true,
        message: "Review submitted successfully",
        data: savedReview,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };