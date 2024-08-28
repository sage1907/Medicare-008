import express from "express";

import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const userRoutes = express.Router();

userRoutes.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
userRoutes.get("/", authenticate, restrict(["admin"]), getAllUser);
userRoutes.put("/:id", authenticate, restrict(["patient"]), updateUser);
userRoutes.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
userRoutes.get(
  "/profile/me",
  authenticate,
  restrict(["patient"]),
  getUserProfile
);
userRoutes.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default userRoutes;
