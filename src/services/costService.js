class CostService {

    constructor() {

        this.totalRequests = 0;

        this.totalCost = 0;

        this.imageCalls = 0;

        this.captionCalls = 0;

    }

    trackImageGeneration() {

        this.imageCalls++;

        this.totalRequests++;

        this.totalCost += 0.02;

    }

    trackCaptionGeneration() {

        this.captionCalls++;

        this.totalRequests++;

        this.totalCost += 0.01;

    }

    getStats() {

        return {

            totalRequests: this.totalRequests,

            imageCalls: this.imageCalls,

            captionCalls: this.captionCalls,

            totalCost: Number(
                this.totalCost.toFixed(2)
            )

        };

    }

}

module.exports = new CostService();