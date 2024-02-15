const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    description: String,
    duration: Number,
    date: Date,
    user: { type: String, ref: 'User' },
}, {versionKey: false});

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);

module.exports = ExerciseModel