const prisma = require("../config/database");

const signature =
require("../utils/webhookSignature");

class WebhookService {

    async processWebhook(body, receivedSignature) {

    console.log("=== processWebhook called ===");
    console.log("Body:", body);
    console.log("Header:", receivedSignature);
        const valid =
            signature.verify(
                body,
                receivedSignature
            );

        if (!valid) {

            throw new Error(
                "Invalid webhook signature"
            );

        }

        const existingEvent =
            await prisma.webhookEvent.findUnique({

                where: {

                    eventId: body.eventId

                }

            });

        if (existingEvent) {

            return {

                success: true,

                message: "Duplicate webhook ignored"

            };

        }

        const campaign =
            await prisma.campaign.findUnique({

                where: {

                    id: body.campaignId

                }

            });

        if (!campaign) {

            throw new Error(
                "Campaign not found"
            );

        }

        await prisma.webhookEvent.create({

            data: {

                eventId: body.eventId,

                campaignId: body.campaignId,

                platform: body.platform,

                signature: receivedSignature,

                payload: JSON.stringify(body),

                processed: true

            }

        });

        await prisma.campaign.update({

            where: {

                id: body.campaignId

            },

            data: {

                status: body.status

            }

        });

        return {

            success: true,

            message: "Webhook processed"

        };

    }

}

module.exports = new WebhookService();