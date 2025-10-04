import mongoose from "mongoose";

export const connection = () => {
  const URI = process.env.MONGO_URI;
  mongoose.connect(URI, {
    dbName: "MERN_AUTHENTICATION",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some error occurred while connecting to database: ${err}`);
    });
};