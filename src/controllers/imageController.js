const path = require("path");

const imageService = require("../services/imageService");

class ImageController {

    async uploadImage(req, res) {

        try {

            if (!req.file) {

                return res.status(400).json({
                    success: false,
                    message: "Image is required"
                });

            }

            const variants =
                await imageService.processImage(
                    req.file.filename
                );

            return res.status(201).json({

                success: true,

                message: "Image uploaded successfully",

                original: {

                    filename: req.file.filename,

                    path: path.join(
                        "uploads",
                        "originals",
                        req.file.filename
                    )

                },

                variants

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