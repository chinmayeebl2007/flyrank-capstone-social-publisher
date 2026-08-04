const { Queue } = require("bullmq");

const connection = require("../config/redis");

const publishQueue = new Queue("publish-campaign", {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 5000
        },
        removeOnComplete: true,
        removeOnFail: false
    }
});

module.exports = publishQueue;