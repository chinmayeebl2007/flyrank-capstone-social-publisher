require("dotenv").config();

const app = require("./app");

const prisma = require("./config/database");

const logger = require("./config/logger");

require("./workers/publisherWorker");

const PORT = process.env.PORT || 5000;

async function startServer() {

    try {

        await prisma.$connect();

        logger.info("PostgreSQL Connected");

        app.listen(PORT, () => {

            logger.info(
                `Server running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        logger.error(error.message);

        process.exit(1);

    }

}

startServer();

process.on("SIGINT", async () => {

    await prisma.$disconnect();

    logger.info("Server stopped");

    process.exit(0);

});

process.on("SIGTERM", async () => {

    await prisma.$disconnect();

    logger.info("Server stopped");

    process.exit(0);

});