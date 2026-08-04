require("dotenv").config();

const app = require("./app");
const prisma = require("./config/database");
const logger = require("./config/logger");

require("./workers/publisherWorker");

const PORT = process.env.PORT || 5000;

let server;

async function startServer() {

    try {

        await prisma.$connect();

        logger.info("PostgreSQL Connected");

        server = app.listen(PORT, () => {

            logger.info(
                `Server running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        logger.error(error.stack);

        process.exit(1);

    }

}

startServer();

async function gracefulShutdown(signal) {

    logger.info(`${signal} received`);

    if (server) {

        server.close(async () => {

            logger.info("HTTP Server Closed");

            await prisma.$disconnect();

            logger.info("PostgreSQL Disconnected");

            process.exit(0);

        });

    }

}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));