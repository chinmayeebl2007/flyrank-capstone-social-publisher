const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

class ImageProcessor {
    async generateVariants(filename) {

        const original = path.join(
            __dirname,
            "../../uploads/originals",
            filename
        );

        const instagramDir = path.join(
            __dirname,
            "../../uploads/instagram"
        );

        const xDir = path.join(
            __dirname,
            "../../uploads/x"
        );

        if (!fs.existsSync(instagramDir)) {
            fs.mkdirSync(instagramDir, { recursive: true });
        }

        if (!fs.existsSync(xDir)) {
            fs.mkdirSync(xDir, { recursive: true });
        }

        const instagramImage = path.join(
            instagramDir,
            filename
        );

        const xImage = path.join(
            xDir,
            filename
        );

        await sharp(original)
            .resize(1080, 1080, {
                fit: "cover",
                position: "centre"
            })
            .toFile(instagramImage);

        await sharp(original)
            .resize(1600, 900, {
                fit: "cover",
                position: "centre"
            })
            .toFile(xImage);

        return {
            instagram: instagramImage,
            x: xImage
        };
    }
}

module.exports = new ImageProcessor();