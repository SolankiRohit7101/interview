import "dotenv/config.js";
import ErrorMiddleware from "./middleware/ErrorMiddleware.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.router.js";
import dbConnection from "./lib/connection.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnection();

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
app.use(ErrorMiddleware);
