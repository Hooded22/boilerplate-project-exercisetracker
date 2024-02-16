const {Router} = require("express");
const LogController = require("./controller");


const logRouter = Router();
const logController = new LogController();

logRouter.get('/', async (req, res) => {
    try {
        const userId = req.params.userId
        const logs = await logController.getAllLogs(userId);

        res.status(200).json(logs);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = logRouter