require("dotenv").config();

const app = require("./app");
const prisma = require("./config/database");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {

        await prisma.$connect();

        console.log("✅ PostgreSQL Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {

        console.error("❌ Failed to start server");
        console.error(error);

        process.exit(1);
    }
}

startServer();

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Database disconnected");
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    console.log("Database disconnected");
    process.exit(0);
});