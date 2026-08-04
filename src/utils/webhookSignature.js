const crypto = require("crypto");

class WebhookSignature {

    generate(payload) {

        const body = JSON.stringify(payload);

        console.log("BODY:", body);

        const hash = crypto
            .createHmac("sha256", process.env.JWT_SECRET)
            .update(body)
            .digest("hex");

        console.log("GENERATED:", hash);

        return hash;
    }

    verify(payload, signature) {

        const expected = this.generate(payload);

        console.log("RECEIVED :", signature);

        return expected === signature;
    }

}

module.exports = new WebhookSignature();