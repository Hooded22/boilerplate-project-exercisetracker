const {Router} = require("express");
const ExerciseController = require("./controller");
const LogController = require("../logs/controller");

const exercisesRouter = Router({mergeParams: true})
const exercisesController = new ExerciseController()
const logsController = new LogController()

exercisesRouter.post('/', async (req, res) => {
    try {
        const data = req.body;
        const userId = req.params.userId;
        const userData = res.locals.currentUser;


        const newExerciseData = await exercisesController.addExercise(data, userId);
        const {_id, ...newExerciseDataObj} = newExerciseData.toObject();
        newExerciseDataObj.date = exercisesController.transformExerciseDateToString(newExerciseDataObj.date)

        await logsController.addExerciseToLog(_id, userId)

        return res.status(200).json( {...userData, ...newExerciseDataObj})
    } catch(e) {
        console.error(e)
        return res.status(400).send(e)
    }
})

exercisesRouter.get('/', async (req, res) => {
    try {
        const userId = req.params.userId
        const exercises = await exercisesController.getExercisesForUserID(userId);

        res.status(200).json(exercises);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = exercisesRouter