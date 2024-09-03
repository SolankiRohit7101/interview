import jwt from "jsonwebtoken";

const generateJwt = async (res, user, statuscode, message) => {
  const { password: pass, ...userData } = user._doc;

  const {
    _id,
    address,
    name,
    email,
    phoneNo,
    hobbies,
    gender,
    profileImage,
    dob,
  } = userData;
  const accesstoken = jwt.sign(userData, process.env.JWTSECRET, {
    expiresIn: "1d",
  });
  return res
    .cookie("accesstoken", accesstoken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    })
    .json({
      success: true,
      message,
      userData: {
        _id,
        address,
        name,
        email,
        phoneNo,
        hobbies,
        gender,
        profileImage,
        dob,
      },
    })
    .status(statuscode);
};

export default generateJwt;
