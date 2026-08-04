const prisma = require("../config/database");
const { randomUUID } = require("crypto");

class CampaignService {
  async createCampaign(data) {
    const { title, body, url } = data;

    const campaign = await prisma.campaign.create({
      data: {
        title,
        body,
        url,
      },
    });

    return campaign;
  }

  async getAllCampaigns() {
    return await prisma.campaign.findMany({
      include: {
        posts: true,
        webhookEvents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getCampaignById(id) {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        posts: true,
        webhookEvents: true,
      },
    });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    return campaign;
  }

  async scheduleCampaign(id, scheduledAt) {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    return await prisma.campaign.update({
      where: { id },
      data: {
        scheduledAt: new Date(scheduledAt),
        status: "SCHEDULED",
      },
    });
  }

  async updateCampaign(id, data) {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    return await prisma.campaign.update({
      where: { id },
      data: {
        title: data.title,
        body: data.body,
        url: data.url,
      },
    });
  }

  async deleteCampaign(id) {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    await prisma.campaign.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Campaign deleted successfully",
    };
  }
}

module.exports = new CampaignService();