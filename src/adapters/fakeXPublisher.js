const { randomUUID } = require("crypto");

const SocialPublisher = require("./socialPublisher");

class FakeXPublisher extends SocialPublisher {

    async publish(post) {

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        return {

            success: true,

            platform: "X",

            platformPostId: randomUUID(),

            publishedAt: new Date().toISOString(),

            post

        };

    }

}

module.exports = new FakeXPublisher();