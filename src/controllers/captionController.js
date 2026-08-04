const captionService = require("../services/captionService");

class CaptionController {

    async generate(req, res) {

        try {

            const { title, body } = req.body;

            if (!title || !body) {

                return res.status(400).json({
                    success: false,
                    message: "title and body are required"
                });

            }

            const captions =
                await captionService.generateCaptions(
                    title,
                    body
                );

            return res.json({

                success: true,

                captions

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new CaptionController();