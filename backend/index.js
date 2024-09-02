import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// route imports
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/user.js";
import doctorRoutes from "./Routes/doctor.js";
import reviewRoutes from "./Routes/review.js";
import bookingRoutes from "./Routes/booking.js";
import feedbackRoutes from "./Routes/feedback.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = ['https://medicare-sagar-basaks-projects.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Apply CORS before all routes

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.get('/', (req, res) => {
    res.send("Api is working!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/doctors/:doctorId/reviews", reviewRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

// database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connection established.");
    } catch (error) {
        console.log("MongoDB connection failed.");
    }
};

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port ", port);
});
