const imageProcessor = require("../utils/imageProcessor");

class ImageService {

    async uploadImage(file) {

        if (!file) {
            throw new Error("Image file is required");
        }

        const variants =
            await imageProcessor.generateVariants(file.filename);

        return {

            filename: file.filename,

            variants

        };

    }

    async processImage(filename) {

        const variants =
            await imageProcessor.generateVariants(filename);

        return {

            success: true,

            variants

        };

    }

}

module.exports = new ImageService();