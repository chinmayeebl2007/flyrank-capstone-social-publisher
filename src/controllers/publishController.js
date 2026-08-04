const publishService = require("../services/publishService");

class PublishController {

    async publishCampaign(req, res) {

        try {

            const result =
                await publishService.publishCampaign(
                    req.params.id
                );

            return res.status(200).json(result);

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new PublishController();