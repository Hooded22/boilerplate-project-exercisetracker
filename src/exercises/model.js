const ExerciseSchema = new mongoose.Schema({
    _id: { type: String, default: () => mongoose.Types.ObjectId().str },
    description: String,
    duration: Number,
    date: Date,
    user: { type: String, ref: 'User' },
});

module.exports = ExerciseSchema