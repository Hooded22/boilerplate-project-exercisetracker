const ExerciseModel = require("./model");

class ExerciseController {
    async addExercise(data, userId) {
        try {
            const exerciseStringDate = this.getExerciseStringDate(data.date)
            const exercise = new ExerciseModel({ ...data, user: userId, date: exerciseStringDate });
            await exercise.save();

            // Fetch the exercise along with user data
            const exerciseData = await ExerciseModel.findById(exercise._id, {user: 0})

            console.log("DATA: ", exerciseData)
            return exerciseData;
        } catch (e) {
            throw new Error(e);
        }
    }

    getExerciseStringDate(date) {
        const exerciseDate = date ? new Date(date) : new Date();
        return exerciseDate.toDateString()
    }

    async getExercisesForUserID(userID, from, to, limit) {
        try {
            let query = ExerciseModel.find({ user: userID }, '-_id -user');

            if(from) {
                query = query.where('date').gte(new Date(from));
            }

            if(to) {
                query = query.where('date').lte(new Date(to));
            }

            if(limit) {
                query = query.limit(limit);
            }

            return await query;

        } catch (e) {
            throw new Error(e);
        }
    }

    transformExerciseToObject(exercise) {
        return exercise.toObject()
    }

    transformExerciseDateToString(date) {
        return new Date(date).toDateString()
    }
}



module.exports = ExerciseController