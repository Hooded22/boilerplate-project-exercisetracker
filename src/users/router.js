const {Router} = require("express");
const UserController = require("./controller");
const exercisesRouter = require("../exercises/router");

const usersRouter = Router();
const usersController = new UserController();


usersRouter.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newUserData = await usersController.addUser(data)

        res.status(200).json(newUserData)
    } catch (e) {
        console.error(e)
        res.status(400).send(e)
    }
})

usersRouter.get('/', async (req, res) => {
    try {
        const users = await usersController.getAllUser();

        res.status(200).json(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

usersRouter.get('/:id', async (req, res) => {
    try {
        const user = await usersController.getUserById(req.params.id);

        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

usersRouter.use('/:userId/exercises', async (req, res, next) => {
    const currentUserData = await usersController.getUserById(req.params.userId);
    res.locals.currentUser = currentUserData.toObject();

    next()
})
usersRouter.use('/:userId/exercises', exercisesRouter)

module.exports = usersRouter