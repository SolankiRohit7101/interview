import express from "express";
import auth from "../middleware/auth.js";
import {
  userProfile,
  registerUser,
  updateUserData,
  passwordChange,
} from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter
  .put("/me", auth, updateUserData)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .put("/changepassword", auth, passwordChange);

export default userRouter;
