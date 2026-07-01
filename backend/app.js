require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const noteRoutes = require("./routes/noteRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

// ==============================
// Connect Database
// ==============================

connectDB();

// ==============================
// Middlewares
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/health", healthRoutes);

// ==============================
// Health Check
// ==============================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "OneDesk Backend Running 🚀"

    });

});

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        success: false,

        message: "Internal Server Error"

    });

});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );

});