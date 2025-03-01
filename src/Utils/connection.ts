import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testuserss");
    console.log("Database Connected Successfully.");
  } catch (err) {
    console.log("Connection is not Establised.");
  }
}

connection();
