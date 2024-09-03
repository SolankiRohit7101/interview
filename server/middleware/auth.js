import jwt from "jsonwebtoken";
import ErrorHandler from "../lib/ErrorHandler.js";

const auth = async (req, res, next) => {
  console.log("check for valid user");

  const token = req.cookies.accesstoken;

  if (!token)
    return next(new ErrorHandler(400, "session expire. please login again"));

  const isValid = jwt.verify(token, process.env.JWTSECRET);
  if (!isValid) return ErrorHandler(400, "invalid credentails. login again");

  req.user = isValid;
  next();
};

export default auth;
