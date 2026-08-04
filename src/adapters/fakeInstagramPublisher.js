const { randomUUID } = require("crypto");

const SocialPublisher = require("./socialPublisher");

class FakeInstagramPublisher extends SocialPublisher {

    async publish(post) {

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        return {

            success: true,

            platform: "INSTAGRAM",

            platformPostId: randomUUID(),

            publishedAt: new Date().toISOString(),

            post

        };

    }

}

module.exports = new FakeInstagramPublisher();