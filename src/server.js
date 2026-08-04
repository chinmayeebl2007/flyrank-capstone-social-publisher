require("dotenv").config();

const app = require("./app");

const prisma = require("./config/database");

require("./workers/publisherWorker");

const PORT = process.env.PORT || 5000;

async function startServer() {

    try {

        await prisma.$connect();

        console.log("✅ PostgreSQL Connected");

        app.listen(PORT, () => {

            console.log(
                `🚀 Server running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

}

startServer();

process.on("SIGINT", async () => {

    await prisma.$disconnect();

    process.exit(0);

});

process.on("SIGTERM", async () => {

    await prisma.$disconnect();

    process.exit(0);

});