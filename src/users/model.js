const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    username: String,
}, {versionKey: false});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel