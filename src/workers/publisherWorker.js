const { Worker } = require("bullmq");

const connection = require("../config/redis");
const publishService = require("../services/publishService");

const worker = new Worker(
    "publish-campaign",

    async (job) => {

        console.log(`Processing Job ${job.id}`);
        console.log(`Campaign ${job.data.campaignId}`);

        await publishService.publishCampaign(
            job.data.campaignId
        );

    },

    {
        connection,
        concurrency: 2
    }
);

worker.on("completed", (job) => {

    console.log(`✅ Job ${job.id} completed`);

});

worker.on("failed", (job, err) => {

    console.log(`❌ Job ${job.id} failed`);

    console.log(`Attempt ${job.attemptsMade}`);

    console.log(err.message);

});

worker.on("error", (err) => {

    console.log(err.message);

});

module.exports = worker;