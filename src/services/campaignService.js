const prisma = require("../config/database");
const publishJob = require("../jobs/publishJob");

class CampaignService {

    async createCampaign(data) {

        return await prisma.campaign.create({
            data
        });

    }

    async getAllCampaigns() {

        return await prisma.campaign.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

    }

    async getCampaignById(id) {

        const campaign = await prisma.campaign.findUnique({
            where: { id }
        });

        if (!campaign) {
            throw new Error("Campaign not found");
        }

        return campaign;

    }

    async updateCampaign(id, data) {

        return await prisma.campaign.update({
            where: { id },
            data
        });

    }

    async deleteCampaign(id) {

        await prisma.campaign.delete({
            where: { id }
        });

        return {
            success: true,
            message: "Campaign deleted successfully"
        };

    }

    async scheduleCampaign(id, scheduledAt) {

        const campaign =
            await prisma.campaign.findUnique({
                where: { id }
            });

        if (!campaign) {
            throw new Error("Campaign not found");
        }

        const updatedCampaign =
            await prisma.campaign.update({

                where: { id },

                data: {

                    status: "SCHEDULED",

                    scheduledAt: new Date(scheduledAt)

                }

            });

        await publishJob.schedule(
            updatedCampaign.id,
            scheduledAt
        );

        return updatedCampaign;

    }

}

module.exports = new CampaignService();