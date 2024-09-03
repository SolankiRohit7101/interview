import ErrorHandler from "../lib/ErrorHandler.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateJwt from "../lib/generateJwt.js";

export const userProfile = async (req, res, next) => {
  console.log(req.user);
  res.json({
    success: "true",
    message: "successfully fetch data",
  });
};

export const updateUserData = async (req, res, next) => {
  const { name, gender, dob, hobbies, address, profileImage } = req.body;
  let _id = req.user._id;
  try {
    const updatedata = await userModel.findByIdAndUpdate(
      _id,
      {
        name,
        gender,
        dob,
        hobbies,
        address,
        profileImage,
      },
      { new: true }
    );
    await updateData.save();

    return generateJwt(res, updatedata, 200, "successfully updated user data");
  } catch (error) {
    next(error);
  }
};
export const registerUser = async (req, res, next) => {
  const {
    name,
    password,
    confirmPassword,
    email,
    phoneNo,
    profileImage,
    hobbies,
    gender,
    dob,
    city,
    state,
    country,
  } = req.body;
  let address = {
    city,
    state,
    country,
  };
  console.log(req.body);
  try {
    if (!password || !email || !phoneNo || !confirmPassword)
      return next(new ErrorHandler(401, "please Prodive all important fields"));

    const isUser = await userModel.findOne({ email });
    const isPhone = await userModel.findOne({ phoneNo });
    if (isUser || isPhone)
      return next(new ErrorHandler(401, "user already register"));
    if (confirmPassword !== password) {
      return next(new ErrorHandler(401, "please enter correct data"));
    }
    const hashPassword = await bcrypt.hash(password.toString(), 8);
    const user = await userModel({
      email,
      password: hashPassword,
      name,
      phoneNo,
      address,
      hobbies,
      gender,
      dob,
      profileImage,
    });
    await user.save();
    return res
      .json({
        success: true,
        message: "register compeleted",
        user,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password, phoneNo, toggleLogin } = req.body;
  console.log(req.body);
  try {
    if ((!email && !password) || (!phoneNo && !password))
      return next(new ErrorHandler(401, "please Prodive all  fields"));
    let isUser;
    if (toggleLogin === "email") {
      isUser = await userModel.findOne({ email });
    } else {
      isUser = await userModel.findOne({ phoneNo });
    }
    if (!isUser)
      return next(new ErrorHandler(401, "user not register with us"));
    const isPassword = await bcrypt.compare(
      password.toString(),
      isUser.password
    );
    if (!isPassword) return next(new ErrorHandler(401, "invalid credentails"));

    return generateJwt(res, isUser, 200, "successfully login");
  } catch (error) {
    next(error);
  }
};

export const passwordChange = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    let _id = req.user._id;
    const user = await userModel.findById(_id);
    const isOldPassValid = await bcrypt.compare(
      oldPassword.toString(),
      user.password
    );
    if (!isOldPassValid || newPassword !== confirmPassword)
      return next(new ErrorHandler(400, "incorrect inputs"));

    if (oldPassword === newPassword)
      return next(
        new ErrorHandler(
          400,
          "new Password can not be same as you previous password"
        )
      );
    const hashPassword = await bcrypt.hash(newPassword.toString(), 8);

    const updateUser = await userModel.findByIdAndUpdate(
      { _id: user._id },
      { password: hashPassword },
      {
        new: true,
      }
    );

    await updateUser.save();

    return generateJwt(res, updateUser, 200, "successfully updated password");
  } catch (error) {
    next(error);
  }
};
