const ExerciseModel = require("./model");

class ExerciseController {
    async addExercise(data, userId) {
        try {
            const exercise = new ExerciseModel({ ...data, user: userId });
            await exercise.save();

            // Fetch the exercise along with user data
            const exerciseData = await ExerciseModel.findById(exercise._id)
                .populate('user');

            console.log("DATA: ", exerciseData)
            return exerciseData;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllExercise() {
        try {
            return  await ExerciseModel.find();
        } catch (e) {
            throw new Error(e);
        }
    }

    async getExerciseForUserID(userID) {
        try {
            return await ExerciseModel.find({ user: userID });
        } catch (e) {
            throw new Error(e);
        }
    }
}



module.exports = ExerciseController