const captionService = require("../services/captionService");
const costService = require("../services/costService");

class CaptionController {

    async generate(req, res) {

        try {

            const captions =
                await captionService.generate(
                    req.body
                );

            costService.trackCaptionGeneration();

            return res.json({

                success: true,

                captions

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new CaptionController();