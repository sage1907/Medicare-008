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

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};

app.get('/', (req, res) => {
    res.send("Api is working!");
});

// database connection
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connection established.");
    } catch (error) {
        console.log("MongoDB connection failed.");
    }
}

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/doctors/:doctorId/reviews", reviewRoutes);

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port ", port);
});