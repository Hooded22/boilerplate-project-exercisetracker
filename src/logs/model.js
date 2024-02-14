const LogSchema = new mongoose.Schema({
    _id: { type: String, default: () => mongoose.Types.ObjectId().str },
    user: { type: String, ref: 'User' },
    log: [{ type: String, ref: 'Exercise' }],
    count: { type: Number, default: 0 },
});

LogSchema.pre('save', function(next) {
    this.count = this.log.length;
    next();
});

module.exports = LogSchema