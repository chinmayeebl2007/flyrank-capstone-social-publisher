require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FlyRank Multi-Platform Social Campaign Publisher API",
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Healthy",
        timestamp: new Date().toISOString()
    });
});

app.use("/api", routes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;