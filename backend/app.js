
require("dotenv").config();
const noteRoutes =
require("./routes/noteRoutes");


const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
console.log("Calling connectDB...");
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.send("OneDesk Backend Running 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Todo Routes
app.use("/api/todos", todoRoutes);
app.use(
    "/api/notes",
    noteRoutes
);

// DB Status Route
app.get("/test-db", (req, res) => {

    const mongoose = require("mongoose");

    res.json({
        readyState: mongoose.connection.readyState
    });

});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const healthRoutes =
    require("./routes/healthRoutes");

app.use(
    "/api/health",
    healthRoutes
);