class SocialPublisher {
    async publish(post) {
        throw new Error("publish() must be implemented.");
    }
}

module.exports = SocialPublisher;