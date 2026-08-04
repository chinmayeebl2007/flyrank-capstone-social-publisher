const costService =
require("../services/costService");

class CostController {

    getCosts(req, res) {

        return res.json({

            success: true,

            data: costService.getStats()

        });

    }

}

module.exports = new CostController();