const mongoose = require("mongoose");

console.log("db.js loaded");

const connectDB = async () => {
  try {

    console.log("Trying to connect...");

    await mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.once("open", () => {
      console.log("MongoDB Connection OPEN ✅");
      console.log(
        "Ready State:",
        mongoose.connection.readyState
      );
    });

  } catch (error) {

    console.error(error);

  }
};

module.exports = connectDB;