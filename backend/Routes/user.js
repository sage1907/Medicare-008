import express from 'express';

import { updateUser, deleteUser, getSingleUser, getAllUser } from "../Controllers/userController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

const userRoutes = express.Router();

userRoutes.get("/:id", authenticate, restrict(['patient']), getSingleUser);
userRoutes.get("/", authenticate, restrict(['admin']), getAllUser);
userRoutes.put("/:id", authenticate, restrict(['patient']), updateUser);
userRoutes.delete("/:id", authenticate, restrict(['patient']), deleteUser);


export default userRoutes;