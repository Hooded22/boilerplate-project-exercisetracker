const mongoose = require("mongoose");
const LogSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    user: { type: String, ref: 'User' },
    log: [{ type: String, ref: 'Exercise', default: [] }],
    count: {type: Number, default: 0}
}, {versionKey: false});

const LogModel = mongoose.model('Log', LogSchema);

module.exports = LogModel