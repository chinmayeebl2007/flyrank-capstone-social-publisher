const imageService = require("../services/imageService");
const costService = require("../services/costService");

class ImageController {

    async uploadImage(req, res) {

        try {

            const result =
                await imageService.uploadImage(req.file);

            costService.trackImageGeneration();

            return res.status(201).json({

                success: true,

                data: result

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new ImageController();