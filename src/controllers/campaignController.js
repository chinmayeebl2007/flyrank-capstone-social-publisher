const campaignService = require("../services/campaignService");

class CampaignController {
  async createCampaign(req, res) {
    try {
      const { title, body, url } = req.body;

      if (!title || !body || !url) {
        return res.status(400).json({
          success: false,
          message: "title, body and url are required",
        });
      }

      const campaign = await campaignService.createCampaign({
        title,
        body,
        url,
      });

      return res.status(201).json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllCampaigns(req, res) {
    try {
      const campaigns = await campaignService.getAllCampaigns();

      return res.json({
        success: true,
        count: campaigns.length,
        data: campaigns,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getCampaignById(req, res) {
    try {
      const campaign = await campaignService.getCampaignById(req.params.id);

      return res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateCampaign(req, res) {
    try {
      const campaign = await campaignService.updateCampaign(
        req.params.id,
        req.body
      );

      return res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async scheduleCampaign(req, res) {
    try {
      const { scheduledAt } = req.body;

      if (!scheduledAt) {
        return res.status(400).json({
          success: false,
          message: "scheduledAt is required",
        });
      }

      const campaign = await campaignService.scheduleCampaign(
        req.params.id,
        scheduledAt
      );

      return res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteCampaign(req, res) {
    try {
      const result = await campaignService.deleteCampaign(req.params.id);

      return res.json(result);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CampaignController();