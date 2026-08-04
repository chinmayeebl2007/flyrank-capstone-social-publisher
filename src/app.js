require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const routes = require("./routes");
const logger = require("./config/logger");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        project: "FlyRank Multi-Platform Social Campaign Publisher",
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "Healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    });
});

app.use("/api", routes);

app.use((req, res) => {

    logger.warn(
        `${req.method} ${req.originalUrl} - Route not found`
    );

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});

app.use((err, req, res, next) => {

    logger.error(`
URL: ${req.originalUrl}
METHOD: ${req.method}
MESSAGE: ${err.message}
STACK:
${err.stack}
`);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});

module.exports = app;