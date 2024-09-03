import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  gender: {
    type: String,
  },
  hobbies: {
    type: [],
  },
  profileImage: {
    type: String,
  },
});

const userModel = model("User", userSchema);

export default userModel;
