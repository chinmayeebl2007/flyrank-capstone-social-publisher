const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: null
});

connection.on("connect", () => {
    console.log("✅ Redis Connected");
});

connection.on("error", (error) => {
    console.error("❌ Redis Error:", error.message);
});

module.exports = connection;