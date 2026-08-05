const webhookService = require("../services/webhookService");

class WebhookController {

    async receive(req, res) {

        console.log("✅ WEBHOOK CONTROLLER HIT");

        try {

            const signature = req.headers["x-signature"];

            console.log("HEADER:", signature);
            console.log("BODY:", req.body);

            const result =
                await webhookService.processWebhook(
                    req.body,
                    signature
                );

            return res.json(result);

        } catch (error) {

            console.log("ERROR:", error.message);

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new WebhookController();