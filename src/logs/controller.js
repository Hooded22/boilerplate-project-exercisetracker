const ExerciseController = require("../exercises/controller");


class LogController extends ExerciseController {
    async getAllUsersLogs(userData, from, to, limit) {
        try {
            const userExercises = await this.getExercisesForUserID(userData._id,  from, to, limit);
            const userExercisesObjStringDate = userExercises.map(exercise => {
                const exerciseObj = exercise.toObject();

                return {
                    ...exerciseObj,
                    date: this.transformExerciseDateToString(exerciseObj.date)
                }
            });

            return {
                ...userData,
                count: userExercisesObjStringDate.length,
                log: userExercisesObjStringDate
            }
        } catch (e) {
            console.error(e);
            throw new Error()
        }
    }
}

module.exports = LogController