const imageProcessor = require("../utils/imageProcessor");

class ImageService {

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