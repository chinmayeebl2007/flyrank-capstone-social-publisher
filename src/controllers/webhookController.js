const webhookService =
require("../services/webhookService");

class WebhookController {

    async receive(req, res) {

        try {

            const signature =
                req.headers["x-signature"];

            const result =
                await webhookService.processWebhook(
                    req.body,
                    signature
                );

            return res.json(result);

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new WebhookController();