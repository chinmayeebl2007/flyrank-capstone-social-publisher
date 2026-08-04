const prisma = require("../config/database");

const instagramPublisher = require("../adapters/fakeInstagramPublisher");
const xPublisher = require("../adapters/fakeXPublisher");

class PublishService {

    async publishCampaign(campaignId) {

        const campaign =
            await prisma.campaign.findUnique({

                where: {
                    id: campaignId
                }

            });

        if (!campaign) {

            throw new Error(
                "Campaign not found"
            );

        }

        if (campaign.status === "PUBLISHED") {

            return {

                success: true,

                message: "Campaign already published"

            };

        }

        if (Math.random() < 0.2) {

            throw new Error(
                "Simulated publishing failure"
            );

        }

        const instagram =
            await instagramPublisher.publish(
                campaign
            );

        const x =
            await xPublisher.publish(
                campaign
            );

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

            instagram,

            x

        };

    }

}

module.exports = new PublishService();