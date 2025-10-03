import mongoose  from "mongoose";

export const connection = ()=>{
  mongoose.connection(URI, {
    dbName : "MERN_AUTHENTICATION"
  })
  .then(()=>{
    console.log("Connected to database.");
  })
  .catch(()=>{
    console.log(`Some error occured while connecting to databasec ${err}`);
  })
};