import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DBURL, { dbName: "interview" })
    .then(() => {
      console.log("db connected success");
    })
    .catch((err) => console.log(err));
};

export default dbConnection;
