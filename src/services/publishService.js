const prisma = require("../config/database");

const instagramPublisher = require("../adapters/fakeInstagramPublisher");
const xPublisher = require("../adapters/fakeXPublisher");

class PublishService {

    async publishCampaign(campaignId) {

        const campaign = await prisma.campaign.findUnique({
            where: {
                id: campaignId
            }
        });

        if (!campaign) {
            throw new Error("Campaign not found");
        }

        const instagramResult =
            await instagramPublisher.publish({
                title: campaign.title,
                body: campaign.body,
                url: campaign.url
            });

        const xResult =
            await xPublisher.publish({
                title: campaign.title,
                body: campaign.body,
                url: campaign.url
            });

        await prisma.campaign.update({

            where: {
                id: campaignId
            },

            data: {
                status: "PUBLISHED"
            }

        });

        return {

            success: true,

            campaignId,

            instagram: instagramResult,

            x: xResult

        };

    }

}

module.exports = new PublishService();