const {Router} = require("express");
const LogController = require("./controller");


const logRouter = Router({mergeParams: true})
const logController = new LogController();

logRouter.get('/', async (req, res) => {
    try {
        const userData = res.locals.currentUser;

        const from = req.query.from;
        const to = req.query.to;
        const limit = req.query.limit;
        const userLog = await logController.getAllUsersLogs(userData, from, to, limit);


        res.status(200).json(userLog);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = logRouter