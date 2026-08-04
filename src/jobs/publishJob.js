const publishQueue = require("./publishQueue");

class PublishJob {

    async schedule(campaignId, scheduledAt) {

        const delay =
            new Date(scheduledAt).getTime() - Date.now();

        await publishQueue.add(
            "publish-campaign",
            {
                campaignId
            },
            {
                delay: delay > 0 ? delay : 0,
                removeOnComplete: true,
                removeOnFail: false
            }
        );

    }

}

module.exports = new PublishJob();