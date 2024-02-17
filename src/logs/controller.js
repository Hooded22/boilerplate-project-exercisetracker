const LogModel = require("./model");
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

 async createEmptyLog(userId) {
     try {
         const logToSave = new LogModel({user: userId })
         return  await logToSave.save();

     } catch (e) {
         throw new Error(e);
     }
 }

 async addExerciseToLog(exerciseId, userId) {
     try {
         const log = await LogModel.findOneAndUpdate(
             {user: userId},
             {$push: {log: exerciseId}, $inc: {count: 1}},
             {new: true}
         )

         console.log("LOG: ", log);
         return log
     } catch (e) {
        console.error(e)
        throw new Error(e);
     }
 }
}

module.exports = LogController